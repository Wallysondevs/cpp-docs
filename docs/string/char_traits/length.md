# std::char_traits&lt;char&gt;::length, std::char_traits&lt;wchar_t&gt;::length, std::char_traits&lt;char8_t&gt;::length, std::char_traits&lt;char16_t&gt;::length, std::char_traits&lt;char32_t&gt;::length

static [std::size_t](<#/doc/types/size_t>) length( const char_type* s ); |  |  (constexpr desde C++17)  

  
Retorna o comprimento da sequência de caracteres apontada por s, isto é, a posição do caractere nulo terminador (char_type()). 

Veja [CharTraits](<#/doc/named_req/CharTraits>) para os requisitos gerais sobre traits de caracteres para `X::length`. 

### Parâmetros

s  |  \-  |  ponteiro para uma sequência de caracteres cujo comprimento será retornado   
  
### Valor de retorno

O comprimento da sequência de caracteres apontada por s. 

### Complexidade

Linear. 

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <string>
     
    void print(const char* str)
    {
        std::cout << std::quoted(str) << " has length = "
                  << std::char_traits<char>::length(str) << '\n';
    }
     
    int main()
    {
        print("foo");
     
        std::string s{"booo"};
        print(s.c_str());
    }
```

Saída: 
```
    "foo" has length = 3
    "booo" has length = 4
```