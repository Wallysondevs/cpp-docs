# std::basic_string&lt;CharT,Traits,Allocator&gt;::operator+=

```cpp
basic_string& operator+=( const basic_string& str ); |  (1)  |  (constexpr desde C++20)
basic_string& operator+=( CharT ch ); |  (2)  |  (constexpr desde C++20)
basic_string& operator+=( const CharT* s ); |  (3)  |  (constexpr desde C++20)
basic_string& operator+=( std::initializer_list<CharT> ilist );  // (4) (desde C++11)
(constexpr desde C++20)
template< class StringViewLike >
basic_string& operator+=( const StringViewLike& t );  // (5) (desde C++17)
(constexpr desde C++20)
```

  
Anexa caracteres adicionais à string.

1) Anexa a string `str`.

2) Anexa o caractere `ch`.

3) Anexa a string de caracteres terminada em nulo apontada por `s`.

4) Anexa caracteres na initializer list `ilist`.

5) Converte implicitamente `t` para uma string view `sv` como se por `[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;`, então anexa caracteres na string view `sv` como se por `append(sv)`.

Esta sobrecarga participa da resolução de sobrecarga apenas se `[std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&, [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>>` for `true` e `[std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&, const CharT*>` for `false`.

### Parâmetros

str  |  \-  |  string a ser anexada   
---|---|---
ch  |  \-  |  valor do caractere a ser anexado   
s  |  \-  |  ponteiro para uma string de caracteres terminada em nulo a ser anexada   
ilist  |  \-  |  [std::initializer_list](<#/doc/utility/initializer_list>) com os caracteres a serem anexados   
t  |  \-  |  objeto (convertível para [std::basic_string_view](<#/doc/string/basic_string_view>)) com os caracteres a serem anexados   
  
### Valor de retorno

*this

### Complexidade

Não há garantias de complexidade padrão; implementações típicas se comportam de forma semelhante a `[`std::vector::insert()`](<#/doc/container/vector/insert>)`.

### Exceções

Se a operação fizesse com que `[`size()`](<#/doc/string/basic_string/size>) excedesse `[`max_size()`](<#/doc/string/basic_string/max_size>)`, lança `[std::length_error](<#/doc/error/length_error>)`.

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Notas

A sobrecarga (2) pode aceitar quaisquer tipos que sejam implicitamente convertíveis para `CharT`. Para `std::string`, onde `CharT` é `char`, o conjunto de tipos aceitáveis inclui todos os tipos aritméticos. Isso pode ter efeitos não intencionais.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string str;
    
        // reserva espaço de armazenamento suficiente para evitar realocação de memória
        str.reserve(50);
    
        std::cout << std::quoted(str) << '\n'; // empty string
    
        str += "This";
        std::cout << std::quoted(str) << '\n';
    
        str += std::string(" is ");
        std::cout << std::quoted(str) << '\n';
    
        str += 'a';
        std::cout << std::quoted(str) << '\n';
    
        str += {' ', 's', 't', 'r', 'i', 'n', 'g', '.'};
        std::cout << std::quoted(str) << '\n';
    
        str += 69.96; // Equivalente a str += static_cast<char>(69.96);
                      // 'E' (código ASCII 69) é anexado pela sobrecarga (2),
                      // o que pode não ser a intenção.
    
        // Para adicionar um valor numérico, considere std::to_string():
        str += std::to_string(1729);
    
        std::cout << std::quoted(str) << '\n';
    }
```

Saída:
```
    ""
    "This"
    "This is "
    "This is a"
    "This is a string."
    "This is a string.E1729"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98  | não havia garantia de segurança de exceção  | adicionada garantia de segurança de exceção forte   
[LWG 2946](<https://cplusplus.io/LWG/issue2946>) | C++17  | a sobrecarga (5) causava ambiguidade em alguns casos  | evitada ao torná-la um template   
  
### Veja também

[ append](<#/doc/string/basic_string/append>) |  anexa caracteres ao final   
(função membro pública)  