# std::swap(std::basic_fstream)

template< class CharT, class Traits >  
void swap( basic_fstream<CharT, Traits>& lhs, basic_fstream<CharT, Traits>& rhs );

  
Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::basic_fstream](<#/doc/io/basic_fstream>). Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs). 

### Parâmetros

lhs, rhs  |  \-  |  streams cujo estado será trocado   
  
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
    
    bool create_stream(std::fstream& fs)
    {
        try
        {
            std::string some_name = "/tmp/test_file.txt";
            std::ios_base::openmode some_flags = fs.trunc; // | other flags
    
            if (std::fstream ts{some_name, some_flags}; ts.is_open())
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
        if (std::fstream fs; create_stream(fs))
        {
            // use fs stream
        }
    }
```

### Veja também

[ swap](<#/doc/io/basic_fstream/swap>)(C++11) | troca dois streams de arquivo   
(função membro pública)  