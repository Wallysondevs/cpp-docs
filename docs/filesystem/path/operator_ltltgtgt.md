# operator&lt;&lt;,&gt;&gt;(std::filesystem::path)

```cpp
template< class CharT, class Traits >
friend std::basic_ostream<CharT,Traits>&
operator<<( std::basic_ostream<CharT,Traits>& os, const path& p );  // (1) (desde C++17)
template< class CharT, class Traits >
friend std::basic_istream<CharT,Traits>&
operator>>( std::basic_istream<CharT,Traits>& is, path& p );  // (2) (desde C++17)
```

  
Realiza entrada ou saída de stream no path p. [std::quoted](<#/doc/io/manip/quoted>) é usado para que espaços não causem truncamento quando lidos posteriormente pelo operador de entrada de stream.

Esses templates de função não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontrados por [argument-dependent lookup](<#/doc/language/adl>) quando std::filesystem::path é uma classe associada dos argumentos. Isso previne conversões indesejáveis na presença de uma _using-directive_ `using namespace std::filesystem;`.

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

### Implementação possível

[operator<<](<#/doc/filesystem/path/operator_ltltgtgt>)  
---
```
    template<class CharT, class Traits>
    friend std::basic_ostream<CharT,Traits>&
        operator<<(std::basic_ostream<CharT,Traits>& os, const path& p)
    {
        os << std::quoted(p.string<CharT,Traits>());
        return os;
    }
```
  
[operator>>](<#/doc/filesystem/path/operator_ltltgtgt>)
```
    template<class CharT, class Traits>
    friend std::basic_istream<CharT,Traits>&
        operator>>(std::basic_istream<CharT,Traits>& is, path& p)
    {
        std::basic_string<CharT, Traits> t;
        is >> std::quoted(t);
        p = t;
        return is;
    }
```
  
### Exemplo

Execute este código
```
    #include <filesystem>
    #include <iostream>
     
    int main()
    {
        std::cout << std::filesystem::current_path() << '\n';
        std::cout << std::filesystem::temp_directory_path() << '\n';
    }
```

Possible output: 
```
    "/home/user"
    "/tmp"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 2989](<https://cplusplus.github.io/LWG/issue2989>) | C++17  | permitia a inserção de tudo conversível para `path` na presença de uma _using-directive_ | tornou-se hidden friend 