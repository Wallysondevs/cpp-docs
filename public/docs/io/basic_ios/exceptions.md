# std::basic_ios&lt;CharT,Traits&gt;::exceptions

[std::ios_base::iostate](<#/doc/io/ios_base/iostate>) exceptions() const; | (1) |
---|---|---
void exceptions( [std::ios_base::iostate](<#/doc/io/ios_base/iostate>) except ); | (2) |

Obtém e define a máscara de exceção do stream. A máscara de exceção determina quais estados de erro disparam exceções do tipo [failure](<#/doc/io/ios_base/failure>).

1) Retorna a máscara de exceção.

2) Define a máscara de exceção para `except`. Se o stream tiver um estado de erro coberto pela máscara de exceção quando chamado, uma exceção é imediatamente disparada.

### Parâmetros

- **except** — máscara de exceção

### Valor de retorno

1) A máscara de exceção atual.

2) (nenhum)

### Notas

| Esta seção está incompleta
Razão: discutir [LWG2349](<https://cplusplus.github.io/LWG/lwg-active.html#2349>) e linkar de ios_base::clear, e das páginas de requisitos de funções de (i/o)utput (não)formatado (ou talvez o comportamento deva ser totalmente elaborado nas páginas de requisitos e linkado a partir daqui). Veja também [stackoverflow.com/a/35089910](<https://stackoverflow.com/a/35089910>)

### Exemplo

Execute este código
```
    #include <fstream>
    #include <iostream>
     
    int main()
    {
        int ivalue;
        try
        {
            std::ifstream in("in.txt");
            in.exceptions(std::ifstream::failbit); // may throw
            in >> ivalue; // may throw
        }
        catch (const std::ios_base::failure& fail)
        {
            // handle exception here
            std::cout << fail.what() << '\n';
        }
    }
```

Saída possível:
```
    basic_ios::clear: iostream error
```