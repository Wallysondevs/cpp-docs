# std::basic_string&lt;CharT,Traits,Allocator&gt;::operator=

```cpp
basic_string& operator=( const basic_string& str ); |  (1) | (constexpr desde C++20)
basic_string& operator=( basic_string&& str )
noexcept(/* see below */);  // (2) (desde C++11)
(constexpr desde C++20)
basic_string& operator=( const CharT* s ); |  (3) | (constexpr desde C++20)
basic_string& operator=( CharT ch ); |  (4) | (constexpr desde C++20)
basic_string& operator=( std::initializer_list<CharT> ilist );  // (5) (desde C++11)
(constexpr desde C++20)
template<class StringViewLike>
basic_string& operator=( const StringViewLike& t );  // (6) (desde C++17)
(constexpr desde C++20)
basic_string& operator=( std::nullptr_t ) = delete;  // (7) (desde C++23)
```

  
Substitui o conteúdo da string. 

1) Substitui o conteúdo por uma cópia de str. Se *this e str forem o mesmo objeto, esta função não tem efeito.

2) Substitui o conteúdo pelos de str usando a semântica de atribuição por movimento (move assignment semantics) de [SequenceContainer](<#/doc/named_req/SequenceContainer>).

Ao contrário de outras atribuições por movimento (move assignments) de sequence containers, referências, ponteiros e iteradores para elementos de str podem ser invalidados.

3) Substitui o conteúdo pelos da string de caracteres terminada em nulo apontada por s como se fosse por assign(s, Traits::length(s)).

4) Substitui o conteúdo pelo caractere ch como se fosse por assign([std::addressof](<#/doc/memory/addressof>)(ch), 1).

5) Substitui o conteúdo pelos da initializer list ilist como se fosse por assign(ilist.begin(), ilist.size()).

6) Converte implicitamente t para uma string view sv como se fosse por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;, então substitui o conteúdo pelos de sv como se fosse por assign(sv).

Esta sobrecarga participa da resolução de sobrecarga (overload resolution) apenas se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&,  
[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for true e [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const StringViewLike&, const CharT*&gt; for false.

7) `std::basic_string` não pode ser atribuído a partir de nullptr.

### Parâmetros

ch  |  \-  |  valor para inicializar os caracteres da string   
---|---|---
str  |  \-  |  string a ser usada como fonte para inicializar a string   
s  |  \-  |  ponteiro para uma string de caracteres terminada em nulo para usar como fonte para inicializar a string   
ilist  |  \-  |  [std::initializer_list](<#/doc/utility/initializer_list>) para inicializar a string   
t  |  \-  |  objeto conversível para [std::basic_string_view](<#/doc/string/basic_string_view>) para inicializar a string   
  
### Valor de retorno

*this

### Complexidade

1) Linear no tamanho de str.

2) Linear no tamanho de *this (formalmente, cada `CharT` deve ser destruído). Se os allocators não forem iguais e não propagarem, então também linear no tamanho de str (uma cópia deve ser feita).

3) Linear no tamanho de s.

4) Constante.

5) Linear no tamanho de ilist.

6) Linear no tamanho de t.

### Exceções

2)

Especificação `noexcept`: 

noexcept([std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::  

propagate_on_container_move_assignment::value

[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::is_always_equal::value)

Se a operação fizesse com que [`size()`](<#/doc/string/basic_string/size>) excedesse [`max_size()`](<#/doc/string/basic_string/max_size>), lança [std::length_error](<#/doc/error/length_error>). 

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string str1;
        std::string str2{"alpha"};
    
        // (1) operator=(const basic_string&);
        str1 = str2;
        std::cout << std::quoted(str1) << ' '   // "alpha"
                  << std::quoted(str2) << '\n'; // "alpha"
    
        // (2) operator=(basic_string&&);
        str1 = std::move(str2);
        std::cout << std::quoted(str1) << ' '   // "alpha"
                  << std::quoted(str2) << '\n'; // "" or "alpha" (unspecified)
    
        // (3) operator=(const CharT*);
        str1 = "beta";
        std::cout << std::quoted(str1) << '\n'; // "beta"
    
        // (4) operator=(CharT);
        str1 = '!'; 
        std::cout << std::quoted(str1) << '\n'; // "!"
    
        // (5) operator=(std::initializer_list<CharT>);
        str1 = {'g', 'a', 'm', 'm', 'a'};
        std::cout << std::quoted(str1) << '\n'; // "gamma"
    
        // (6) operator=(const T&);
        str1 = 35U; // equivalent to str1 = static_cast<char>(35U);
        std::cout << std::quoted(str1) << '\n'; // "#" (ASCII = 35)
    }
```

Saída possível: 
```
    "alpha" "alpha"
    "alpha" ""
    "beta"
    "!"
    "gamma"
    "#"
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98  | não havia garantia de segurança de exceção  | adicionada garantia de segurança de exceção forte   
[LWG 2063](<https://cplusplus.github.io/LWG/issue2063>) | C++11  | o operador de atribuição por movimento (move assignment operator) não seguia  
o requisito semântico de [SequenceContainer](<#/doc/named_req/SequenceContainer>)  | segue   
[LWG 2946](<https://cplusplus.github.io/LWG/issue2946>) | C++17  | a sobrecarga ([6](<#/>)) causava ambiguidade em alguns casos  | evitada ao torná-la um template   
  
### Veja também

[ (construtor)](<#/doc/string/basic_string/basic_string>) |  constrói uma `basic_string`   
(função membro pública)  
[ assign](<#/doc/string/basic_string/assign>) |  atribui caracteres a uma string   
(função membro pública)  
[ operator=](<#/>) |  atribui uma view   
(função membro pública de `std::basic_string_view<CharT,Traits>`)