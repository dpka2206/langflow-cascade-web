
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, Bell } from 'lucide-react';

const UserActions = () => {
  const { t } = useTranslation();
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      {/* Notifications Button (only show for logged in users on larger screens) */}
      {user && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/notifications')}
          className="hidden sm:flex text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 items-center space-x-2 backdrop-blur-sm"
        >
          <Bell className="h-4 w-4" />
          <span className="hidden md:inline font-semibold text-sm">Notifications</span>
        </Button>
      )}

      {/* User Actions */}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center space-x-1 sm:space-x-2 backdrop-blur-sm"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline font-semibold text-sm">Account</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white/95 backdrop-blur-sm border border-purple-200 shadow-xl rounded-xl z-50">
            {userRole === 'admin' ? (
              <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer hover:bg-purple-50 text-sm">
                <Settings className="h-4 w-4 mr-2" />
                {t('nav.admin')}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer hover:bg-purple-50 text-sm">
                <User className="h-4 w-4 mr-2" />
                {t('nav.dashboard')}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => navigate('/notifications')} className="cursor-pointer hover:bg-purple-50 text-sm sm:hidden">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 hover:bg-red-50 text-sm">
              <LogOut className="h-4 w-4 mr-2" />
              {t('nav.signout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/auth">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-transparent border-white/50 text-white hover:bg-white hover:text-purple-900 transition-all duration-300 hover:scale-105 font-semibold text-xs sm:text-sm"
          >
            <User className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">{t('nav.login')}</span>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default UserActions;
