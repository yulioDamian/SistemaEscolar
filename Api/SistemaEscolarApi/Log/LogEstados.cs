using SistemaEscolarApi.Clases;
using SistemaEscolarApi.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaEscolarApi.Log
{
    public class LogEstados
    {
        public List<Estados> lstestados()
        {
            Estados e ;
            List<Estados> LstEstados = new List<Estados>();
            
                using (DB_A18E01_DBEscolarEntities dc = new DB_A18E01_DBEscolarEntities())
                {
                    //var v = dc.CatalogoEstados.Where(a => a.Est_Estatus.Equals(true) && a.Id_Estado.Equals(1)).FirstOrDefault(); 

                    var TBEstado = from est in dc.CatalogoEstados where est.Est_Estatus == false select est;

                    foreach (var lsest in TBEstado)
                    {
                        e = new Estados();
                        e.IdEstado = lsest.Id_Estado;
                        e.Nombre = lsest.Est_Nombre;
                        LstEstados.Add(e);
                    }
                }
            return LstEstados;
        }
       
    }
}