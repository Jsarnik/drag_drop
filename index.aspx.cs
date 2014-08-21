using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Text.RegularExpressions;

public partial class index : System.Web.UI.Page
{    
    public string jsonStringObj;
    public string html;
    public string gsConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
    
    protected void Page_Load(object sender, EventArgs e)
    {
        html = createHTML();
        jsonStringObj = getProjects();
    }

    public string getProjects()
    {
        DataTable dtProjects = new DataTable();

        SqlConnection conn = new SqlConnection();
        conn.ConnectionString = gsConnectionString;
        try
        {
            SqlCommand cmd = new SqlCommand("sproc_projectsFrontPage", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dtProjects);
            conn.Open();
            cmd.ExecuteNonQuery();
            conn.Close();

            return GetJSONString(dtProjects);
        }
        catch (Exception ex)
        {
            return "";
        }
    }

    public static string GetJSONString(DataTable dt)
    {

        string[] StrDc = new string[dt.Columns.Count];
        StringBuilder sb = new StringBuilder("{\"project\": [");

        DataView dv = dt.DefaultView;
        DataTable dtDistinct = dv.ToTable(true, "ProjectID", "ProjectName");

        try
        {
            foreach (DataRow r in dtDistinct.Rows)
            {
                int projectID = (int)r[0];
                sb.Append("{\"name\":\"" + r[1].ToString().Trim().Replace(" ", "") + "\",\"id\":\"" + r[0].ToString().Trim() + "\",\"images\":[");

                foreach (DataRow row in dt.Rows)
                {
                    if ((int)row[0] == projectID)
                        sb.Append("{\"filePath\": \"img/"+ row[1].ToString().Trim().Replace(" ","") + "/" + row[2].ToString().Trim() +"\"},");
                }
                sb.Remove(sb.Length - 1, 1);

                sb.Append("]},");
            }
            sb.Remove(sb.Length - 1, 1);
            sb.Append("]}");

            return sb.ToString();

        }
        catch (Exception ex)
        {
            return "";
        }
    }

    public static bool IsOdd(int value)
    {
	return value % 2 != 0;
    }

    public string createHTML()
    {
        DataTable dt = new DataTable();
        StringBuilder sb = new StringBuilder("");
        SqlConnection conn = new SqlConnection();
        conn.ConnectionString = gsConnectionString;
        try
        {
            SqlCommand cmd = new SqlCommand("Select Distinct * From Projects Where IsActive = 1", conn);

            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            conn.Open();
            cmd.ExecuteNonQuery();
            conn.Close();

            for (int i=0; i< dt.Rows.Count; i++)
            {
                DataRow row = dt.Rows[i];
                string projectName = row[1].ToString().Trim();
                string leftOrRight = "left";
                if (IsOdd(i))
                    leftOrRight = "right";

                sb.Append("<a href='/Projects/index.aspx?project=" + projectName + "'><div id='" + projectName.Replace(" ", "") + "'class='project-thumbs " + leftOrRight + "'> <img class='overlay' src='/img/" + projectName.Replace(" ", "") + "/overlay.png' /></div></a>");
            }
            sb.Append("");
            return sb.ToString(); ;
        }
        catch (Exception ex)
        {
            return "";
        }

    }    
}
