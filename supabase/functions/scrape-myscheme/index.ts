
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

    // Get sample schemes data (in production, this would scrape myscheme.gov)
    const schemes = getSampleSchemeData()
    
    console.log(`Found ${schemes.length} schemes to process`)

    let successCount = 0
    let errorCount = 0

    // Insert schemes into database
    for (const scheme of schemes) {
      try {
        console.log(`Processing scheme: ${scheme.name}`)

        // Check if scheme already exists
        const { data: existingScheme } = await supabaseClient
          .from('central_government_schemes')
          .select('id')
          .eq('scheme_name', scheme.name)
          .single()

        let schemeId

        if (existingScheme) {
          // Update existing scheme
          const { data: updatedScheme, error: updateError } = await supabaseClient
            .from('central_government_schemes')
            .update({
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
              status: 'active',
              updated_at: new Date().toISOString()
            })
            .eq('id', existingScheme.id)
            .select('id')
            .single()

          if (updateError) {
            console.error('Error updating scheme:', updateError)
            errorCount++
            continue
          }
          schemeId = existingScheme.id
        } else {
          // Insert new scheme
          const { data: newScheme, error: insertError } = await supabaseClient
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

          if (insertError) {
            console.error('Error inserting scheme:', insertError)
            errorCount++
            continue
          }
          schemeId = newScheme.id
        }

        // Clean up existing related data for this scheme
        await supabaseClient.from('scheme_categories').delete().eq('scheme_id', schemeId)
        await supabaseClient.from('scheme_beneficiaries').delete().eq('scheme_id', schemeId)
        await supabaseClient.from('scheme_documents').delete().eq('scheme_id', schemeId)

        // Insert categories
        if (scheme.categories && scheme.categories.length > 0) {
          const categoryInserts = scheme.categories.map(cat => ({
            scheme_id: schemeId,
            category_name: cat.name,
            sub_category: cat.subCategory
          }))

          const { error: categoryError } = await supabaseClient
            .from('scheme_categories')
            .insert(categoryInserts)

          if (categoryError) {
            console.error('Error inserting categories:', categoryError)
          }
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

          const { error: beneficiaryError } = await supabaseClient
            .from('scheme_beneficiaries')
            .insert(beneficiaryInserts)

          if (beneficiaryError) {
            console.error('Error inserting beneficiaries:', beneficiaryError)
          }
        }

        // Insert documents
        if (scheme.requiredDocuments && scheme.requiredDocuments.length > 0) {
          const documentInserts = scheme.requiredDocuments.map(doc => ({
            scheme_id: schemeId,
            document_name: doc.name,
            document_type: doc.type,
            is_mandatory: doc.mandatory
          }))

          const { error: documentError } = await supabaseClient
            .from('scheme_documents')
            .insert(documentInserts)

          if (documentError) {
            console.error('Error inserting documents:', documentError)
          }
        }

        console.log(`Successfully processed scheme: ${scheme.name}`)
        successCount++

      } catch (error) {
        console.error(`Error processing scheme ${scheme.name}:`, error)
        errorCount++
      }
    }

    console.log(`Scraping completed. Success: ${successCount}, Errors: ${errorCount}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully processed ${successCount} schemes with ${errorCount} errors`,
        schemes: successCount,
        errors: errorCount
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

function getSampleSchemeData() {
  return [
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
      name: "Kisan Credit Card (KCC)",
      code: "KCC-001",
      ministry: "Ministry of Agriculture and Farmers Welfare",
      department: "Department of Agriculture and Cooperation",
      description: "Credit facility for farmers to meet their cultivation expenses and other agricultural needs",
      objectives: "To provide adequate and timely credit support from the banking system to the farmers for their cultivation and other needs",
      benefits: "Credit limit up to Rs. 3 lakh without collateral security",
      eligibility: "All farmers including tenant farmers, oral lessees, and sharecroppers",
      applicationProcess: "Apply through any bank branch or online through bank portals",
      documents: "Land documents, Identity proof, Address proof, Income certificate",
      url: "https://www.pmkisan.gov.in/",
      category: "agriculture",
      targetBeneficiaries: "All categories of farmers",
      fundingPattern: "Banking system with government support",
      implementationAgency: "Banks and Financial Institutions",
      launchDate: "1998-08-01",
      categories: [
        { name: "Agriculture", subCategory: "Credit Support" }
      ],
      beneficiaries: [
        {
          type: "Farmers",
          ageGroup: "18+",
          gender: "All",
          incomeCriteria: "All income groups",
          casteCriteria: "All categories",
          locationCriteria: "All states"
        }
      ],
      requiredDocuments: [
        { name: "Land Documents", type: "Property", mandatory: true },
        { name: "Identity Proof", type: "Identity", mandatory: true },
        { name: "Address Proof", type: "Address", mandatory: true }
      ]
    },
    {
      name: "Soil Health Card Scheme",
      code: "SHC-001",
      ministry: "Ministry of Agriculture and Farmers Welfare",
      department: "Department of Agriculture and Cooperation",
      description: "Provide soil health cards to farmers which carry crop-wise recommendations of nutrients and fertilizers",
      objectives: "To promote judicious use of fertilizers and improve soil health and fertility",
      benefits: "Free soil testing and customized fertilizer recommendations",
      eligibility: "All farmers across the country",
      applicationProcess: "Apply through agriculture department or online portal",
      documents: "Land records, Farmer identification",
      url: "https://soilhealth.dac.gov.in/",
      category: "agriculture",
      targetBeneficiaries: "All farmers",
      fundingPattern: "100% Central Government funding",
      implementationAgency: "State Agriculture Departments",
      launchDate: "2015-02-19",
      categories: [
        { name: "Agriculture", subCategory: "Soil Management" }
      ],
      beneficiaries: [
        {
          type: "Farmers",
          ageGroup: "18+",
          gender: "All",
          incomeCriteria: "All income groups",
          casteCriteria: "All categories",
          locationCriteria: "All states"
        }
      ],
      requiredDocuments: [
        { name: "Land Records", type: "Property", mandatory: true },
        { name: "Farmer ID", type: "Identity", mandatory: true }
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
    },
    {
      name: "National Rural Employment Guarantee Act (NREGA/MGNREGA)",
      code: "NREGA-001",
      ministry: "Ministry of Rural Development",
      department: "Department of Rural Development",
      description: "Guaranteed wage employment scheme providing 200 days of employment per year to rural households",
      objectives: "To enhance livelihood security of households in rural areas by providing guaranteed wage employment",
      benefits: "Guaranteed 200 days of wage employment per financial year",
      eligibility: "Adult members of rural households willing to do unskilled manual work",
      applicationProcess: "Apply through Gram Panchayat or online through NREGA portal",
      documents: "Job card, Bank account details, Aadhaar card",
      url: "https://www.nrega.nic.in/",
      category: "employment",
      targetBeneficiaries: "Rural households",
      fundingPattern: "Central and State Government funding",
      implementationAgency: "Gram Panchayats",
      launchDate: "2005-02-02",
      categories: [
        { name: "Employment", subCategory: "Rural Employment" }
      ],
      beneficiaries: [
        {
          type: "Rural Households",
          ageGroup: "18+",
          gender: "All",
          incomeCriteria: "All income groups",
          casteCriteria: "All categories",
          locationCriteria: "Rural areas"
        }
      ],
      requiredDocuments: [
        { name: "Job Card", type: "Employment", mandatory: true },
        { name: "Bank Account Details", type: "Financial", mandatory: true },
        { name: "Aadhaar Card", type: "Identity", mandatory: false }
      ]
    },
    {
      name: "Pradhan Mantri Scholarship Scheme",
      code: "PMS-001",
      ministry: "Ministry of Defence",
      department: "Department of Ex-Servicemen Welfare",
      description: "Scholarship scheme for children and widows of ex-servicemen for higher education",
      objectives: "To encourage higher education among children and widows of ex-servicemen",
      benefits: "Monthly scholarship ranging from Rs. 2000 to Rs. 3000",
      eligibility: "Children and widows of ex-servicemen for graduation and post-graduation courses",
      applicationProcess: "Apply online through National Scholarship Portal",
      documents: "Ex-serviceman certificate, Academic certificates, Income certificate",
      url: "https://scholarships.gov.in/",
      category: "education",
      targetBeneficiaries: "Ex-servicemen families",
      fundingPattern: "100% Central Government funding",
      implementationAgency: "Department of Ex-Servicemen Welfare",
      launchDate: "2006-01-01",
      categories: [
        { name: "Education", subCategory: "Higher Education" }
      ],
      beneficiaries: [
        {
          type: "Students",
          ageGroup: "18-35",
          gender: "All",
          incomeCriteria: "Ex-servicemen families",
          casteCriteria: "All categories",
          locationCriteria: "All states"
        }
      ],
      requiredDocuments: [
        { name: "Ex-Serviceman Certificate", type: "Service", mandatory: true },
        { name: "Academic Certificates", type: "Educational", mandatory: true },
        { name: "Income Certificate", type: "Financial", mandatory: true }
      ]
    }
  ]
}
