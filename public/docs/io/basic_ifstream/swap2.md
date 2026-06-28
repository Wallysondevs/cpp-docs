# std::swap(std::basic_ifstream)

template< class CharT, class Traits >  
void swap( basic_ifstream<CharT, Traits>& lhs, basic_ifstream<CharT, Traits>& rhs );

  
Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::basic_ifstream](<#/doc/io/basic_ifstream>). Troca o estado de `lhs` com o de `rhs`. Efetivamente chama `lhs.swap(rhs)`. 

### Parâmetros

lhs, rhs  |  \-  |  streams cujo estado deve ser trocado   
  
### Valor de retorno

(nenhum) 

### Exceções

Pode lançar exceções definidas pela implementação. 

### Exemplo

Execute este código
```cpp 
    #include <fstream>
    #include <iostream>
    #include <string>
    
    bool create_stream(std::ifstream& fs)
    {
        try
        {
            std::string some_name = "/tmp/test_file.txt";
            std::ios_base::openmode some_flags = fs.trunc; // | other flags
    
            if (std::ifstream ts{some_name, some_flags}; ts.is_open())
            {
                std::swap(ts, fs); // stream objects are not copyable => swap
                return true;
            }
        }
        catch (...)
        {
            std::cout << "Exception!\n";
        }
        return false;
    }
    
    int main()
    {
        if (std::ifstream fs; create_stream(fs))
        {
            // use fs stream
        }
    }
```

### Veja também

[ swap](<#/doc/io/basic_ifstream/swap>)(desde C++11) |  troca dois file streams   
(função membro pública)  