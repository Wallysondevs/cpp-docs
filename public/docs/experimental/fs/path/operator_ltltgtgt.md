# operator&lt;&lt;,&gt;&gt;(std::experimental::filesystem::path)

template< class CharT, class Traits >  
[std::basic_ostream](<#/doc/io/basic_ostream>)<CharT,Traits>&  
operator<<( [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT,Traits>& os, const path& p ); |  (1)  |  (filesystem TS)  
template< class CharT, class Traits >  
[std::basic_istream](<#/doc/io/basic_istream>)<CharT,Traits>&  
operator>>( [std::basic_istream](<#/doc/io/basic_istream>)<CharT,Traits>& is, path& p ); |  (2)  |  (filesystem TS)  

  
Realiza entrada ou saída de stream no path p. [std::quoted](<#/doc/io/manip/quoted>) é usado para que espaços não causem truncamento quando lidos posteriormente pelo operador de entrada de stream.

### Parâmetros

os  |  \-  |  stream para realizar a saída   
---|---|---
is  |  \-  |  stream para realizar a entrada   
p  |  \-  |  path para inserir ou extrair   
  
### Valor de retorno

1) os

2) is

### Exceções

Pode lançar exceções definidas pela implementação.

### Possível implementação

Primeira versão   
---
```
    template<class CharT, class Traits>
    std::basic_ostream<CharT,Traits>&
        operator<<(std::basic_ostream<CharT,Traits>& os, const path& p)
    {
        os << std::quoted(p.string<CharT,Traits>());
        return os;
    }
```
  
Segunda versão 
```
    template<class CharT, class Traits>
    std::basic_istream<CharT,Traits>&
        operator>>(std::basic_istream<CharT,Traits>& is, path& p)
    {
        std::basic_string<CharT, Traits> t;
        is >> std::quoted(t);
        p = t;
        return is;
    }
```
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   