//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SistemaEscolarApi.DB
{
    using System;
    using System.Collections.Generic;
    
    public partial class FormaPago
    {
        public int Id_FormaPago { get; set; }
        public int FPag_Id_Usuario { get; set; }
        public string FPag_Nombre { get; set; }
        public string FPag_NumeroTarjeta { get; set; }
        public string FPag_NumeroCuenta { get; set; }
        public string FPag_FechaVencimiento { get; set; }
        public int FPag_Ccv { get; set; }
        public int FPag_Id_Banco { get; set; }
        public int FPag_Id_TipoCuenta { get; set; }
        public bool FPag_Estatus { get; set; }
        public System.DateTime FPag_FechaAlta { get; set; }
        public System.DateTime FPag_FechaModificacion { get; set; }
        public System.DateTime FPag_FechaBaja { get; set; }
    
        public virtual CatalogoBancos CatalogoBancos { get; set; }
        public virtual CatalogoTipoCuenta CatalogoTipoCuenta { get; set; }
        public virtual Usuarios Usuarios { get; set; }
    }
}
