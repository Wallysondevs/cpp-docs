# std::basic_ofstream&lt;CharT,Traits&gt;::swap

```cpp
void swap( basic_ofstream& other );  // (desde C++11)
```

  
Troca o estado do stream com o de other.

Isso é feito chamando basic_ostream<CharT, Traits>::swap(other) e rdbuf()->swap(other.rdbuf()).

### Parâmetros

other  |  \-  |  stream para trocar o estado com   
  
### Valor de retorno

(nenhum)

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```cpp
    #include <fstream>
    #include <iomanip>
    #include <iostream>
    #include <string>
    
    bool create_stream(std::fstream& fs, const std::string& path)
    {
        try
        {
            std::fstream ts{path, ts.trunc | ts.in | ts.out};
            if (ts.is_open())
            {
                ts.swap(fs); // stream objects are not copyable
                return true;
            }
        }
        catch (...)
        {
            std::cout << "Exception!\n";
        }
        return false;
    }
    
    void use_stream(std::fstream& fs)
    {
        fs.seekg(0);
        std::string data;
        fs >> data;
        std::cout << "data: " << std::quoted(data) << '\n';
    }
    
    int main()
    {
        std::fstream fs;
        std::string path = "/tmp/test_file.txt";
        if (create_stream(fs, path))
        {
            fs.write(path.c_str(), path.length());
            use_stream(fs);
        }
    }
```

Saída possível:
```
    data: "/tmp/test_file.txt"
```

### Veja também

[ operator=](<#/>)(C++11) | move o file stream   
(função membro pública)  
[ swap](<#/doc/io/basic_filebuf/swap>)(C++11) | troca dois objetos `basic_filebuf`   
(função membro pública de `std::basic_filebuf<CharT,Traits>`)