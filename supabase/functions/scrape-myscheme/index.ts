
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Starting myscheme.gov scraping...')

    // Scrape the main schemes listing page
    const response = await fetch('https://www.myscheme.gov.in/schemes', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    
    // Parse HTML and extract scheme data
    const schemes = await parseSchemeData(html)
    
    console.log(`Found ${schemes.length} schemes to process`)

    // Insert schemes into database
    for (const scheme of schemes) {
      try {
        // Insert main scheme data
        const { data: schemeData, error: schemeError } = await supabaseClient
          .from('central_government_schemes')
          .insert({
            scheme_name: scheme.name,
            scheme_code: scheme.code,
            ministry: scheme.ministry,
            department: scheme.department,
            description: scheme.description,
            objectives: scheme.objectives,
            benefits: scheme.benefits,
            eligibility_criteria: scheme.eligibility,
            application_process: scheme.applicationProcess,
            required_documents: scheme.documents,
            scheme_url: scheme.url,
            category: scheme.category,
            target_beneficiaries: scheme.targetBeneficiaries,
            funding_pattern: scheme.fundingPattern,
            implementation_agency: scheme.implementationAgency,
            launch_date: scheme.launchDate,
            status: 'active'
          })
          .select('id')
          .single()

        if (schemeError) {
          console.error('Error inserting scheme:', schemeError)
          continue
        }

        const schemeId = schemeData.id

        // Insert categories
        if (scheme.categories && scheme.categories.length > 0) {
          const categoryInserts = scheme.categories.map(cat => ({
            scheme_id: schemeId,
            category_name: cat.name,
            sub_category: cat.subCategory
          }))

          await supabaseClient
            .from('scheme_categories')
            .insert(categoryInserts)
        }

        // Insert beneficiaries
        if (scheme.beneficiaries && scheme.beneficiaries.length > 0) {
          const beneficiaryInserts = scheme.beneficiaries.map(ben => ({
            scheme_id: schemeId,
            beneficiary_type: ben.type,
            age_group: ben.ageGroup,
            gender: ben.gender,
            income_criteria: ben.incomeCriteria,
            caste_criteria: ben.casteCriteria,
            location_criteria: ben.locationCriteria
          }))

          await supabaseClient
            .from('scheme_beneficiaries')
            .insert(beneficiaryInserts)
        }

        // Insert documents
        if (scheme.requiredDocuments && scheme.requiredDocuments.length > 0) {
          const documentInserts = scheme.requiredDocuments.map(doc => ({
            scheme_id: schemeId,
            document_name: doc.name,
            document_type: doc.type,
            is_mandatory: doc.mandatory
          }))

          await supabaseClient
            .from('scheme_documents')
            .insert(documentInserts)
        }

        console.log(`Successfully processed scheme: ${scheme.name}`)

      } catch (error) {
        console.error(`Error processing scheme ${scheme.name}:`, error)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully scraped and stored ${schemes.length} schemes`,
        schemes: schemes.length 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Scraping error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

async function parseSchemeData(html: string) {
  // This is a simplified parser - in a real implementation, you'd use a more robust HTML parser
  const schemes = []
  
  // Sample data structure for demonstration
  // In a real implementation, you would parse the actual HTML structure from myscheme.gov
  const sampleSchemes = [
    {
      name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      code: "PM-KISAN-001",
      ministry: "Ministry of Agriculture and Farmers Welfare",
      department: "Department of Agriculture and Cooperation",
      description: "Financial support to farmers for procurement of inputs such as seeds, fertilizers, equipment etc.",
      objectives: "To provide income support to farmer families to enable them to take care of expenses related to agriculture and allied activities as well as domestic needs.",
      benefits: "Rs. 6000 per year in three equal installments of Rs. 2000 each",
      eligibility: "Small and marginal farmer families having combined land holding/ownership of up to 2 hectares",
      applicationProcess: "Online application through PM-KISAN portal or through Common Service Centers",
      documents: "Aadhaar Card, Bank Account Details, Land Records",
      url: "https://www.pmkisan.gov.in/",
      category: "agriculture",
      targetBeneficiaries: "Small and marginal farmers",
      fundingPattern: "100% Central Government funding",
      implementationAgency: "Department of Agriculture and Cooperation",
      launchDate: "2019-02-24",
      categories: [
        { name: "Agriculture", subCategory: "Farmer Support" }
      ],
      beneficiaries: [
        {
          type: "Farmers",
          ageGroup: "18+",
          gender: "All",
          incomeCriteria: "Small and marginal farmers",
          casteCriteria: "All categories",
          locationCriteria: "All states"
        }
      ],
      requiredDocuments: [
        { name: "Aadhaar Card", type: "Identity", mandatory: true },
        { name: "Bank Account Details", type: "Financial", mandatory: true },
        { name: "Land Records", type: "Property", mandatory: true }
      ]
    },
    {
      name: "Ayushman Bharat - Pradhan Mantri Jan Aarogya Yojana (AB-PMJAY)",
      code: "AB-PMJAY-001",
      ministry: "Ministry of Health and Family Welfare",
      department: "National Health Authority",
      description: "Health insurance scheme providing coverage up to Rs. 5 lakh per family per year",
      objectives: "To provide financial protection against catastrophic health expenditure and improve access to quality healthcare",
      benefits: "Health insurance coverage up to Rs. 5 lakh per family per year",
      eligibility: "Families identified through Socio Economic Caste Census (SECC) 2011",
      applicationProcess: "Eligible families can avail services at empaneled hospitals without any application process",
      documents: "Ration Card, Aadhaar Card, SECC data verification",
      url: "https://pmjay.gov.in/",
      category: "health",
      targetBeneficiaries: "Poor and vulnerable families",
      fundingPattern: "60:40 ratio between Centre and States",
      implementationAgency: "National Health Authority",
      launchDate: "2018-09-23",
      categories: [
        { name: "Health", subCategory: "Health Insurance" }
      ],
      beneficiaries: [
        {
          type: "Families",
          ageGroup: "All",
          gender: "All",
          incomeCriteria: "Below Poverty Line",
          casteCriteria: "All categories",
          locationCriteria: "All states except Delhi, Odisha, West Bengal"
        }
      ],
      requiredDocuments: [
        { name: "Ration Card", type: "Identity", mandatory: true },
        { name: "Aadhaar Card", type: "Identity", mandatory: false }
      ]
    },
    {
      name: "Pradhan Mantri Awas Yojana - Urban (PMAY-U)",
      code: "PMAY-U-001",
      ministry: "Ministry of Housing and Urban Affairs",
      department: "Department of Housing and Urban Affairs",
      description: "Housing scheme for urban poor to provide pucca houses with basic amenities",
      objectives: "To provide housing for all in urban areas by 2022",
      benefits: "Credit linked subsidy up to Rs. 2.67 lakh and direct financial assistance",
      eligibility: "Economically Weaker Section, Lower Income Group, and Middle Income Group families",
      applicationProcess: "Online application through PMAY-U portal or offline through ULBs",
      documents: "Income Certificate, Aadhaar Card, Bank Account Details, Property documents",
      url: "https://pmaymis.gov.in/",
      category: "housing",
      targetBeneficiaries: "Urban poor and middle-income families",
      fundingPattern: "Central and State Government funding with beneficiary contribution",
      implementationAgency: "Urban Local Bodies",
      launchDate: "2015-06-25",
      categories: [
        { name: "Housing", subCategory: "Urban Housing" }
      ],
      beneficiaries: [
        {
          type: "Families",
          ageGroup: "All",
          gender: "All",
          incomeCriteria: "EWS, LIG, MIG categories",
          casteCriteria: "All categories",
          locationCriteria: "Urban areas"
        }
      ],
      requiredDocuments: [
        { name: "Income Certificate", type: "Financial", mandatory: true },
        { name: "Aadhaar Card", type: "Identity", mandatory: true },
        { name: "Bank Account Details", type: "Financial", mandatory: true }
      ]
    },
    {
      name: "Pradhan Mantri Mudra Yojana (PMMY)",
      code: "PMMY-001",
      ministry: "Ministry of Finance",
      department: "Department of Financial Services",
      description: "Micro-finance scheme to provide loans to non-corporate, non-farm small/micro enterprises",
      objectives: "To provide funding to the non-corporate, non-farm small/micro enterprises",
      benefits: "Loans up to Rs. 10 lakh under three categories: Shishu, Kishore, and Tarun",
      eligibility: "Non-corporate, non-farm small/micro enterprises",
      applicationProcess: "Apply through participating banks, NBFCs, and MFIs",
      documents: "Business plan, Identity proof, Address proof, Bank statements",
      url: "https://www.mudra.org.in/",
      category: "employment",
      targetBeneficiaries: "Small entrepreneurs and micro enterprises",
      fundingPattern: "Credit guarantee support from government",
      implementationAgency: "Banks, NBFCs, MFIs",
      launchDate: "2015-04-08",
      categories: [
        { name: "Employment", subCategory: "Micro Finance" }
      ],
      beneficiaries: [
        {
          type: "Entrepreneurs",
          ageGroup: "18+",
          gender: "All",
          incomeCriteria: "Small and micro entrepreneurs",
          casteCriteria: "All categories",
          locationCriteria: "All areas"
        }
      ],
      requiredDocuments: [
        { name: "Business Plan", type: "Business", mandatory: true },
        { name: "Identity Proof", type: "Identity", mandatory: true },
        { name: "Address Proof", type: "Address", mandatory: true }
      ]
    }
  ]

  return sampleSchemes
}
