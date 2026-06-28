# std::basic_string&lt;CharT,Traits,Allocator&gt;::append

```cpp
basic_string& append( size_type count, CharT ch ); | (1) | (constexpr desde C++20)
basic_string& append( const CharT* s, size_type count ); | (2) | (constexpr desde C++20)
basic_string& append( const CharT* s ); | (3) | (constexpr desde C++20)
template< class SV >
basic_string& append( const SV& t );  // (4) (desde C++17)
(constexpr desde C++20)
template< class SV >
basic_string& append( const SV& t, size_type pos,
size_type count = npos );  // (5) (desde C++17)
(constexpr desde C++20)
basic_string& append( const basic_string& str ); | (6) | (constexpr desde C++20)
  // (7)
basic_string& append( const basic_string& str,
size_type pos, size_type count );  // (até C++14)
basic_string& append( const basic_string& str,
size_type pos, size_type count = npos );  // (desde C++14)
(constexpr desde C++20)
template< class InputIt >
basic_string& append( InputIt first, InputIt last ); | (8) | (constexpr desde C++20)
basic_string& append( std::initializer_list<CharT> ilist );  // (9) (desde C++11)
(constexpr desde C++20)
```

Anexa caracteres adicionais à string.

1) Anexa `count` cópias do caractere `ch`.

2) Anexa caracteres no range `[`s`, `s + count`)`.

Se `[`s`, `s + count`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

3) Equivalente a `return append(s, Traits::length(s));`.

4,5) Anexa caracteres em uma string view `sv` construída a partir de `t`.

  * Se apenas `t` for fornecido, todos os caracteres em `sv` são anexados.
  * Se `pos` também for fornecido:
    * Se `count` for [`npos`](<#/doc/string/basic_string>), todos os caracteres em `sv` a partir de `pos` são anexados.
    * Caso contrário, os [std::min](<#/doc/algorithm/min>)(count, sv.size() - pos) caracteres em `sv` a partir de `pos` são anexados.

Essas sobrecargas participam da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas:

  * [std::is_convertible_v](<#/doc/types/is_convertible>)<const SV&, [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for verdadeiro.
  * [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const SV&, const CharT*&gt; for falso.

4) Equivalente a `[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t; return append(sv.data(), sv.size());`.

5) Equivalente a `[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t; return append(sv.substr(pos, count));`.

6,7) Anexa caracteres de outra string `str`.

  * Se apenas `str` for fornecido, todos os caracteres nele são anexados.
  * Se `pos` também for fornecido:
    * Se `count` for [`npos`](<#/doc/string/basic_string>), todos os caracteres em `str` a partir de `pos` são anexados.
    * Caso contrário, os [std::min](<#/doc/algorithm/min>)(count, str.size() - pos) caracteres em `str` a partir de `pos` são anexados.

6) Equivalente a `return append(str.data(), str.size());`.

7) Equivalente a `return append([std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> (str).substr(pos, count));. | (desde C++20)`

8) Equivalente a `return append(basic_string(first, last, get_allocator()));`. Esta sobrecarga tem o mesmo efeito que a sobrecarga (1) se `InputIt` for um tipo integral. | (até C++11)
---|---
Esta sobrecarga participa da resolução de sobrecarga apenas se `InputIt` satisfizer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>). | (desde C++11)

9) Equivalente a `return append(ilist.begin(), ilist.size());`.

### Parâmetros

- **count** — número de caracteres a anexar
- **ch** — valor do caractere a anexar
- **s** — ponteiro para a string de caracteres a anexar
- **t** — objeto conversível para [std::basic_string_view](<#/doc/string/basic_string_view>) com os caracteres a anexar
- **pos** — o índice do primeiro caractere a anexar
- **str** — string a anexar
- **first, last** — range de caracteres a anexar
- **ilist** — initializer list com os caracteres a anexar

### Valor de retorno

`*this`

### Complexidade

Não há garantias de complexidade padrão; implementações típicas se comportam de forma semelhante a [`std::vector::insert()`](<#/doc/container/vector/insert>).

### Exceções

Se a operação fizesse com que [`size()`](<#/doc/string/basic_string/size>) excedesse [`max_size()`](<#/doc/string/basic_string/max_size>), lança [std::length_error](<#/doc/error/length_error>).

5) Se `pos > sv.size()` for verdadeiro, lança [std::out_of_range](<#/doc/error/out_of_range>).

7) Se `pos > str.size()` for verdadeiro, lança [std::out_of_range](<#/doc/error/out_of_range>).

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <string>
    
    int main()
    {
        std::string str = "std::string";
        const char* cptr = "C-string";
        const char carr[] = "range";
    
        std::string result;
    
        // 1) Anexa um char 3 vezes.
        // Nota: Esta é a única sobrecarga que aceita "CharT"s.
        result.append(3, '*');
        assert(result == "***");
    
        // 2) Anexa uma C-string de tamanho fixo
        result.append(cptr, 5);
        assert(result == "***C-str");
    
        // 3) Anexa uma C-string terminada em nulo
        // Nota: Como "append" retorna *this, podemos encadear chamadas.
        result.append(1, ' ').append(cptr);
        assert(result == "***C-str C-string");
    
        // 6) Anexa uma string inteira
        result.append(1, ' ').append(str);
        assert(result == "***C-str C-string std::string");
    
        // 7) Anexa parte de uma string
        result.append(str, 3, 2);
        assert(result == "***C-str C-string std::string::");
    
        // 8) Anexa range
        result.append(&carr[2], &carr[3]);
        assert(result == "***C-str C-string std::string::n");
    
        // 9) Anexa initializer list
        result.append({'p', 'o', 's'});
        assert(result == "***C-str C-string std::string::npos");
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98 | não havia garantia de segurança de exceção | adicionada garantia de segurança de exceção forte
[LWG 2250](<https://cplusplus.github.io/LWG/issue2250>) | C++98 | o comportamento da sobrecarga (7) era indefinido se `pos > str.size()` fosse verdadeiro | sempre lança uma exceção neste caso
[LWG 2788](<https://cplusplus.github.io/LWG/issue2788>) | C++98 | a sobrecarga (8) usava um alocador construído por padrão para construir a string temporária | obtém o alocador de [get_allocator()](<#/doc/string/basic_string/get_allocator>)
[LWG 2946](<https://cplusplus.github.io/LWG/issue2946>) | C++17 | a sobrecarga (4) causa ambiguidade em alguns casos | evitada tornando-a um template

### Veja também

[ append_range](<#/doc/string/basic_string/append_range>)(C++23) | anexa um range de caracteres ao final
(função membro pública)
[ operator+=](<#/>) | anexa caracteres ao final
(função membro pública)
[ strcat](<#/doc/string/byte/strcat>) | concatena duas strings
(função)
[ strncat](<#/doc/string/byte/strncat>) | concatena uma certa quantidade de caracteres de duas strings
(função)
[ wcscat](<#/doc/string/wide/wcscat>) | anexa uma cópia de uma wide string a outra
(função)
[ wcsncat](<#/doc/string/wide/wcsncat>) | anexa uma certa quantidade de wide characters de uma wide string a outra
(função)