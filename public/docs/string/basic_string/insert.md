# std::basic_string&lt;CharT,Traits,Allocator&gt;::insert

```cpp
basic_string& insert( size_type index, size_type count, CharT ch ); | (1) | (constexpr desde C++20)
basic_string& insert( size_type index, const CharT* s ); | (2) | (constexpr desde C++20)
basic_string& insert( size_type index, const CharT* s, size_type count ); | (3) | (constexpr desde C++20)
basic_string& insert( size_type index, const basic_string& str ); | (4) | (constexpr desde C++20)
  // (5)
basic_string& insert( size_type index, const basic_string& str,
size_type s_index, size_type count );  // (até C++14)
basic_string& insert( size_type index, const basic_string& str,
size_type s_index, size_type count = npos );  // (desde C++14)
(constexpr desde C++20)
  // (6)
iterator insert( iterator pos, CharT ch );  // (até C++11)
iterator insert( const_iterator pos, CharT ch );  // (desde C++11)
(constexpr desde C++20)
  // (7)
void insert( iterator pos, size_type count, CharT ch );  // (até C++11)
iterator insert( const_iterator pos, size_type count, CharT ch );  // (desde C++11)
(constexpr desde C++20)
  // (8)
template< class InputIt >
void insert( iterator pos, InputIt first, InputIt last );  // (até C++11)
template< class InputIt >
iterator insert( const_iterator pos, InputIt first, InputIt last );  // (desde C++11)
(constexpr desde C++20)
iterator insert( const_iterator pos, std::initializer_list<CharT> ilist );  // (9) (desde C++11)
(constexpr desde C++20)
template< class StringViewLike >
basic_string& insert( size_type index, const StringViewLike& t );  // (10) (desde C++17)
(constexpr desde C++20)
template< class StringViewLike >
basic_string& insert( size_type index, const StringViewLike& t,
size_type t_index, size_type count = npos );  // (11) (desde C++17)
(constexpr desde C++20)
```

Insere caracteres na string.

1) Insere `count` cópias do caractere `ch` na posição `index`.

2) Insere a string de caracteres terminada em nulo apontada por `s` na posição `index`. O comprimento da string é determinado pelo primeiro caractere nulo usando `Traits::length(s)`.

3) Insere os caracteres no range `[`s`, `s + count`)` na posição `index`. O range pode conter caracteres nulos.

4) Insere a string `str` na posição `index`.

5) Insere uma string, obtida por `str.substr(s_index, count)` na posição `index`.

6) Insere o caractere `ch` antes do caractere apontado por `pos`.

7) Insere `count` cópias do caractere `ch` antes do elemento (se houver) apontado por `pos`.

8) Insere caracteres do range `[`first`, `last`)` antes do elemento (se houver) apontado por `pos`, como se fosse por `insert(pos - begin(), basic_string(first, last, get_allocator()))`. Esta sobrecarga não participa da resolução de sobrecarga se `InputIt` não satisfizer [LegacyInputIterator](<#/doc/named_req/InputIterator>). | (desde C++11)

9) Insere elementos da initializer list `ilist` antes do elemento (se houver) apontado por `pos`.

10) Converte implicitamente `t` para uma string view `sv` como se fosse por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> `sv = t;`, então insere os elementos de `sv` antes do elemento (se houver) apontado por `index`, como se fosse por `insert(index, sv.data(), sv.size())`.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&,
[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for `true` e [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const StringViewLike&, const CharT*&gt; for `false`.

11) Converte implicitamente `t` para uma string view `sv` como se fosse por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> `sv = t;`, então insere, antes do elemento (se houver) apontado por `index`, os caracteres da subview `[`t_index`, `t_index + count`)` de `sv`.

  * Se a subview solicitada se estender além do final de `sv`, ou se `count == npos`, a subview resultante é `[`t_index`, `sv.size()`)`.
  * Se `t_index > sv.size()`, ou se `index > size()`, [std::out_of_range](<#/doc/error/out_of_range>) é lançada.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&,
[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for `true` e [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const StringViewLike&, const CharT*&gt; for `false`.

Se `pos` não for um iterator válido em `*this`, o comportamento é indefinido.

### Parâmetros

- **index** — posição na qual o conteúdo será inserido
- **pos** — iterator antes do qual os caracteres serão inseridos
- **ch** — caractere a ser inserido
- **count** — número de caracteres a serem inseridos
- **s** — ponteiro para a string de caracteres a ser inserida
- **str** — string a ser inserida
- **first, last** — range que define os caracteres a serem inseridos
- **s_index** — posição do primeiro caractere em `str` a ser inserido
- **ilist** — [std::initializer_list](<#/doc/utility/initializer_list>) de onde os caracteres serão inseridos
- **t** — objeto (convertível para [std::basic_string_view](<#/doc/string/basic_string_view>)) de onde os caracteres serão inseridos
- **t_index** — posição do primeiro caractere em `t` a ser inserido
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Valor de retorno

1-5) `*this`

6-9) Um iterator que se refere à cópia do primeiro caractere inserido ou `pos` se nenhum caractere foi inserido (`count == 0` ou `first == last` ou `ilist.size() == 0`)

10,11) `*this`

### Exceções

1-4,10) Lança [std::out_of_range](<#/doc/error/out_of_range>) se `index > size()`.

5) Lança [std::out_of_range](<#/doc/error/out_of_range>) se `index > size()` ou se `s_index > str.size()`.

11) Lança [std::out_of_range](<#/doc/error/out_of_range>) se `index > size()` ou se `t_index > sv.size()`.

Em todos os casos, lança [std::length_error](<#/doc/error/length_error>) se `size() + ins_count > max_size()` onde `ins_count` é o número de caracteres que serão inseridos.

Em todos os casos, se [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::allocate lançar uma exceção, ela é relançada. | (desde C++20)

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iterator>
    #include <string>
     
    using namespace std::string_literals;
     
    int main()
    {
        std::string s = "xmplr";
     
        // insert(size_type index, size_type count, char ch)
        s.insert(0, 1, 'E');
        assert("Exmplr" == s);
     
        // insert(size_type index, const char* s)
        s.insert(2, "e");
        assert("Exemplr" == s);
     
        // insert(size_type index, string const& str)
        s.insert(6, "a"s);
        assert("Exemplar" == s);
     
        // insert(size_type index, string const& str,
        //        size_type s_index, size_type count)
        s.insert(8, " is an example string."s, 0, 14);
        assert("Exemplar is an example" == s);
     
        // insert(const_iterator pos, char ch)
        s.insert(s.cbegin() + s.find_first_of('n') + 1, ':');
        assert("Exemplar is an: example" == s);
     
        // insert(const_iterator pos, size_type count, char ch)
        s.insert(s.cbegin() + s.find_first_of(':') + 1, 2, '=');
        assert("Exemplar is an:== example" == s);
     
        // insert(const_iterator pos, InputIt first, InputIt last)
        {
            std::string seq = " string";
            s.insert(s.begin() + s.find_last_of('e') + 1,
                std::begin(seq), std::end(seq));
            assert("Exemplar is an:== example string" == s);
        }
     
        // insert(const_iterator pos, std::initializer_list<char>)
        s.insert(s.cbegin() + s.find_first_of('g') + 1, {'.'});
        assert("Exemplar is an:== example string." == s);
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 7](<https://cplusplus.github.io/LWG/issue7>) | C++98 | a sobrecarga (8) referia-se a uma sobrecarga não existente | refere-se à sobrecarga (4) corretamente
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98 | não havia garantia de segurança de exceção | adicionada garantia de segurança de exceção forte
[LWG 2946](<https://cplusplus.github.io/LWG/issue2946>) | C++17 | a sobrecarga (10) causava ambiguidade em alguns casos | evitada tornando-a um template

### Veja também

[ insert_range](<#/doc/string/basic_string/insert_range>)(C++23) | insere um range de caracteres
(função membro pública)
[ append](<#/doc/string/basic_string/append>) | anexa caracteres ao final
(função membro pública)
[ push_back](<#/doc/string/basic_string/push_back>) | anexa um caractere ao final
(função membro pública)