<?php

namespace Database\Seeders;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesAndPermissions extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Define all permissions
        $permissions = [
            'manage users', 'manage vendors', 'manage products', 'update product', 'delete product', 'manage orders',
            'manage categories', 'manage payments', 'manage discounts', 'manage settings',
            'manage analytics', 'assign roles', 'view system logs', 'manage own products',
            'manage own orders', 'manage stock', 'update stock levels', 'manage own profile', 'view own reports', 'view sales reports',
            'apply discounts', 'manage returns', 'view products', 'place orders', 'track orders',
            'submit reviews', 'manage profile', 'create wishlist', 'apply coupons',
            'access customer support', 'approve reviews', 'moderate vendors', 'manage complaints',
            'moderate comments', 'escalate issues', 'view assigned orders', 'update delivery status',
            'contact customers', 'view delivery reports', 'view support tickets', 'respond to support tickets',
            'escalate tickets', 'track order issues', 'create promotions', 'manage site-wide discounts',
            'view marketing analytics', 'manage campaigns', 'edit SEO settings', 'manage admin staff', 'assign admin roles', 'view system logs', 
            'manage high-level settings', 'generate reports', 'manage user escalations',
            'inventory audits', 'manage supplier relations', 'track revenue metrics',
            'customer sales escalations', 'approve vendor payouts', 'audit transactions',
            'training support staff', 'manage product variants', 'set product visibility',
            'generate order reports', 'monitor delivery', 'apply vendor discounts',
            'create promotions', 'generate vendor finance reports', 'coordinate with vendors',
        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign permissions
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $adminRole->givePermissionTo(Permission::all());



        // Define roles and assign permissions
        $rolesPermissions = [
            'Vendor' => [
                 'manage own products', 'manage own orders', 'manage stock',
            'manage own profile', 'view own reports', 'apply discounts', 'manage returns'
            ],
            'Customer' => [
                 'view products', 'place orders', 'track orders', 'submit reviews',
            'manage profile', 'create wishlist', 'apply coupons', 'access customer support'
            ],
            'Moderator' => [
                'approve reviews', 'moderate vendors', 'manage complaints', 'moderate comments', 'escalate issues'
            ],
            'Delivery Personnel' => [
                'view assigned orders', 'update delivery status', 'contact customers', 'view delivery reports'
            ],
            'Support Agent' => [
                'view support tickets', 'respond to support tickets', 'escalate tickets', 'track order issues'
            ],
            'Marketing Manager' => [
                'create promotions', 'manage site-wide discounts', 'view marketing analytics', 
            'manage campaigns', 'edit SEO settings'
            ],
            'Admin Manager' => [
                'manage admin staff', 'assign admin roles', 'view system logs', 
                'manage high-level settings', 'generate reports', 'manage user escalations'
            ],
            'Inventory Manager' => [
                'manage products', 'manage categories', 'update stock levels', 
                'inventory audits', 'manage supplier relations'
            ],
            'Sales Manager' => [
                'view sales reports', 'manage site-wide discounts', 'coordinate with vendors', 
                'track revenue metrics', 'customer sales escalations'
            ],
            'Product Manager (Vendor)' => [
                'manage own products', 'update product', 'delete product',
            ],
            
        ];

        // Assign permissions to roles
        foreach ($rolesPermissions as $roleName => $permissions) {
            $role = Role::firstOrCreate(['name' => $roleName]);
            $role->givePermissionTo($permissions);
        }
    }
}
