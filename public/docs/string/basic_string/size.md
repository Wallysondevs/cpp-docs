# std::basic_string&lt;CharT,Traits,Allocator&gt;::size, std::basic_string&lt;CharT,Traits,Allocator&gt;::length

size_type size() const; | (1) | (noexcept desde C++11)
(constexpr desde C++20)
size_type length() const; | (2) | (noexcept desde C++11)
(constexpr desde C++20)

Retorna o número de elementos `CharT` na string, ou seja, [std::distance](<#/doc/iterator/distance>)(begin(), end()).

### Parâmetros

(nenhum)

### Valor de retorno

O número de elementos `CharT` na string.

### Complexidade

Não especificado | (até C++11)
---|---
Constante | (desde C++11)

### Observações

Para [std::string](<#/doc/string/basic_string>), os elementos são bytes (objetos do tipo char), que não são o mesmo que caracteres se uma codificação multibyte como UTF-8 for usada.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iterator>
    #include <string>
    
    int main()
    {
        std::string s("Exemplar");
        assert(8 == s.size());
        assert(s.size() == s.length());
        assert(s.size() == static_cast<std::string::size_type>(
            std::distance(s.begin(), s.end())));
    
        std::u32string a(U"ハロー・ワールド"); // 8 code points
        assert(8 == a.size()); // 8 code units in UTF-32
    
        std::u16string b(u"ハロー・ワールド"); // 8 code points
        assert(8 == b.size()); // 8 code units in UTF-16
    
        std::string c("ハロー・ワールド"); // 8 code points
        assert(24 == c.size()); // 24 code units in UTF-8
    
        #if __cpp_lib_char8_t >= 201907L
        std::u8string d(u8"ハロー・ワールド"); // 8 code points
        assert(24 == d.size()); // 24 code units in UTF-8
        #endif
    }
```

### Veja também

[ empty](<#/doc/string/basic_string/empty>) | verifica se a string está vazia
(função membro pública)
[ max_size](<#/doc/string/basic_string/max_size>) | retorna o número máximo de caracteres
(função membro pública)
[ sizelength](<#/doc/string/basic_string_view/size>) | retorna o número de caracteres
(função membro pública de `std::basic_string_view<CharT,Traits>`)