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
    
    public partial class EstadoCuenta
    {
        public int Id_EstadoCuenta { get; set; }
        public int ECue_Id_Usuario { get; set; }
        public decimal ECue_MontoFijo { get; set; }
        public decimal ECue_MontoMes { get; set; }
        public decimal ECue_Adeudo { get; set; }
        public int ECue_Mes { get; set; }
        public int ECue_Ano { get; set; }
        public bool ECue_Estatus { get; set; }
        public System.DateTime ECue_FechaAlta { get; set; }
        public System.DateTime ECue_FechaModificacion { get; set; }
        public System.DateTime ECue_FechaBaja { get; set; }
    
        public virtual Usuarios Usuarios { get; set; }
    }
}
