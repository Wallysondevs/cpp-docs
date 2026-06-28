# std::basic_string_view&lt;CharT,Traits&gt;::find_first_not_of

```cpp
constexpr size_type
find_first_not_of( basic_string_view v, size_type pos = 0 ) const noexcept;  // (1) (desde C++17)
constexpr size_type
find_first_not_of( CharT ch, size_type pos = 0 ) const noexcept;  // (2) (desde C++17)
constexpr size_type
find_first_not_of( const CharT* s, size_type pos, size_type count ) const;  // (3) (desde C++17)
constexpr size_type
find_first_not_of( const CharT* s, size_type pos = 0 ) const;  // (4) (desde C++17)
```

  
Encontra o primeiro caractere que não é igual a nenhum dos caracteres na sequência de caracteres fornecida.

1) Encontra o primeiro caractere que não é igual a nenhum dos caracteres de v nesta view, começando na posição pos.

2) Equivalente a find_first_not_of(basic_string_view([std::addressof](<#/doc/memory/addressof>)(ch), 1), pos).

3) Equivalente a find_first_not_of(basic_string_view(s, count), pos).

4) Equivalente a find_first_not_of(basic_string_view(s), pos).

### Parâmetros

v  |  \-  |  view a ser pesquisada   
---|---|---
pos  |  \-  |  posição onde iniciar a busca   
count  |  \-  |  comprimento da string de caracteres a comparar   
s  |  \-  |  ponteiro para uma string de caracteres a comparar   
ch  |  \-  |  caractere a comparar   
  
### Valor de retorno

Posição do primeiro caractere que não é igual a nenhum dos caracteres na string fornecida, ou [std::string_view::npos](<#/doc/string/basic_string_view/npos>) se nenhum caractere for encontrado. 

### Complexidade

O([size()](<#/doc/string/basic_string_view/size>)` * v.`[size()](<#/doc/string/basic_string_view/size>)`) no pior caso. 

### Exemplo

Execute este código
```cpp 
    #include <string_view>
    using namespace std::literals;
    
    int main()
    {
        static_assert(2 == "BCDEF"sv.find_first_not_of("ABC"));
                        //    ^
        static_assert(4 == "BCDEF"sv.find_first_not_of("ABC", 4));
                        //      ^
        static_assert(1 == "BCDEF"sv.find_first_not_of('B'));
                        //   ^
        static_assert(3 == "BCDEF"sv.find_first_not_of('D', 2));
                        //     ^
    }
```

### Veja também

[ find](<#/doc/string/basic_string_view/find>) | encontra caracteres na view   
(função membro pública)  
[ rfind](<#/doc/string/basic_string_view/rfind>) | encontra a última ocorrência de uma substring   
(função membro pública)  
[ find_first_of](<#/doc/string/basic_string_view/find_first_of>) | encontra a primeira ocorrência de caracteres   
(função membro pública)  
[ find_last_of](<#/doc/string/basic_string_view/find_last_of>) | encontra a última ocorrência de caracteres   
(função membro pública)  
[ find_last_not_of](<#/doc/string/basic_string_view/find_last_not_of>) | encontra a última ausência de caracteres   
(função membro pública)  
[ find_first_not_of](<#/doc/string/basic_string/find_first_not_of>) | encontra a primeira ausência de caracteres   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)