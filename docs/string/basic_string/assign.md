# std::basic_string&lt;CharT,Traits,Allocator&gt;::assign

```cpp
basic_string& assign( const basic_string& str ); | (1) | (constexpr desde C++20)
basic_string& assign( basic_string&& str ) noexcept(/* veja abaixo */);  // (2) (desde C++11)
(constexpr desde C++20)
basic_string& assign( size_type count, CharT ch ); | (3) | (constexpr desde C++20)
basic_string& assign( const CharT* s, size_type count ); | (4) | (constexpr desde C++20)
basic_string& assign( const CharT* s ); | (5) | (constexpr desde C++20)
template< class SV >
basic_string& assign( const SV& t );  // (6) (desde C++17)
(constexpr desde C++20)
template< class SV >
basic_string& assign( const SV& t,
size_type pos, size_type count = npos);  // (7) (desde C++17)
(constexpr desde C++20)
  // (8)
basic_string& assign( const basic_string& str,
size_type pos, size_type count );  // (até C++14)
basic_string& assign( const basic_string& str,
size_type pos, size_type count = npos);  // (desde C++14)
(constexpr desde C++20)
template< class InputIt >
basic_string& assign( InputIt first, InputIt last ); | (9) | (constexpr desde C++20)
basic_string& assign( std::initializer_list<CharT> ilist );  // (10) (desde C++11)
(constexpr desde C++20)
```

Substitui o conteúdo da string.

1) Equivalente a return *this = str;.

2) Equivalente a return *this = std::move(str);.

3) Substitui o conteúdo com count cópias do caractere ch.

Equivalente a clear(); resize(n, c); return *this;.

4) Substitui o conteúdo com cópias dos caracteres no range `[`s`, `s + count`)`.

Se `[`s`, `s + count`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

5) Equivalente a return assign(s, Traits::length(s));.

6,7) Substitui o conteúdo com caracteres em um string view sv construído a partir de t.

  * Se apenas t for fornecido, substitui o conteúdo com todos os caracteres em sv.
  * Se pos também for fornecido:
    * Se count for [`npos`](<#/doc/string/basic_string>), substitui o conteúdo com todos os caracteres em sv começando de pos.
    * Caso contrário, substitui o conteúdo com os [std::min](<#/doc/algorithm/min>)(count, sv.size() - pos) caracteres em sv começando de pos.

Essas sobrecargas participam da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas:

  * [std::is_convertible_v](<#/doc/types/is_convertible>)<const SV&, [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for true.
  * [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const SV&, const CharT*&gt; for false.

6) Equivalente a [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;
return assign(sv.data(), sv.size());.

7) Equivalente a [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;
return assign(sv.substr(pos, count));.

8) Substitui o conteúdo com caracteres em str.

  * Se count for [`npos`](<#/doc/string/basic_string>), substitui o conteúdo com todos os caracteres em str começando de pos.
  * Caso contrário, substitui o conteúdo com os [std::min](<#/doc/algorithm/min>)(count, str.size() - pos) caracteres em str começando de pos.

Equivalente a return assign([std::basic_string_view](<#/doc/string/basic_string_view>)
(str).substr(pos, count));. | (desde C++20)

9) Equivalente a return assign(basic_string(first, last, get_allocator()));. Esta sobrecarga participa da resolução de sobrecarga apenas se `InputIt` satisfizer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>). | (desde C++11)

10) Equivalente a return assign(ilist.begin(), ilist.size());.

### Parâmetros

- **str** — string a ser usada como fonte para inicializar os caracteres
- **count** — tamanho da string resultante
- **ch** — valor para inicializar os caracteres da string
- **s** — ponteiro para uma string de caracteres a ser usada como fonte para inicializar a string
- **t** — objeto (convertível para [std::basic_string_view](<#/doc/string/basic_string_view>)) para inicializar os caracteres da string
- **pos** — índice do primeiro caractere a ser pego
- **first, last** — range para copiar os caracteres
- **ilist** — [std::initializer_list](<#/doc/utility/initializer_list>) para inicializar os caracteres da string

### Valor de retorno

*this

### Exceções

2)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept([std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::

propagate_on_container_move_assignment::value

[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::is_always_equal::value)

Se a operação fizesse com que [`size()`](<#/doc/string/basic_string/size>) excedesse [`max_size()`](<#/doc/string/basic_string/max_size>), lança [std::length_error](<#/doc/error/length_error>).

7) Se pos > sv.size() for true, lança [std::out_of_range](<#/doc/error/out_of_range>).

8) Se pos > str.size() for true, lança [std::out_of_range](<#/doc/error/out_of_range>).

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <string>
    
    int main()
    {
        std::string s;
        // assign(size_type count, CharT ch)
        s.assign(4, '=');
        std::cout << s << '\n'; // "===="
    
        std::string const c("Exemplary");
        // assign(const basic_string& str)
        s.assign(c);
        std::cout << c << " == " << s << '\n'; // "Exemplary == Exemplary"
    
        // assign(const basic_string& str, size_type pos, size_type count)
        s.assign(c, 0, c.length() - 1);
        std::cout << s << '\n'; // "Exemplar";
    
        // assign(basic_string&& str)
        s.assign(std::string("C++ by ") + "example");
        std::cout << s << '\n'; // "C++ by example"
    
        // assign(const CharT* s, size_type count)
        s.assign("C-style string", 7);
        std::cout << s << '\n'; // "C-style"
    
        // assign(const CharT* s)
        s.assign("C-style\0string");
        std::cout << s << '\n'; // "C-style"
    
        char mutable_c_str[] = "C-style string";
        // assign(InputIt first, InputIt last)
        s.assign(std::begin(mutable_c_str), std::end(mutable_c_str) - 1);
        std::cout << s << '\n'; // "C-style string"
    
        // assign(std::initializer_list<CharT> ilist)
        s.assign({'C', '-', 's', 't', 'y', 'l', 'e'});
        std::cout << s << '\n'; // "C-style"
    }
```

Output:
```
    ====
    Exemplary == Exemplary
    Exemplar
    C++ by example
    C-style
    C-style
    C-style string
    C-style
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98 | não havia garantia de segurança de exceção | adicionada garantia de segurança de exceção forte
[LWG 2063](<https://cplusplus.github.io/LWG/issue2063>) | C++11 | nota não normativa afirmava que a sobrecarga ([2](<#/doc/string/basic_string/assign>)) poderia ser implementada por troca | corrigido para exigir move assignment
[LWG 2250](<https://cplusplus.github.io/LWG/issue2250>) | C++98 | o comportamento da sobrecarga ([8](<#/doc/string/basic_string/assign>)) era indefinido se pos > str.size() fosse true | sempre lança uma exceção neste caso
[LWG 2579](<https://cplusplus.github.io/LWG/issue2579>) | C++98 | a sobrecarga ([1](<#/doc/string/basic_string/assign>)) e o operador de atribuição de cópia tinham efeitos diferentes | eles têm o mesmo efeito
[LWG 2946](<https://cplusplus.github.io/LWG/issue2946>) | C++17 | a sobrecarga ([6](<#/doc/string/basic_string/assign>)) causava ambiguidade em alguns casos | evitada ao torná-la um template

### Veja também

[ assign_range](<#/doc/string/basic_string/assign_range>)(C++23) | atribui um range de caracteres a uma string
(função membro pública)
[ (constructor)](<#/doc/string/basic_string/basic_string>) | constrói um `basic_string`
(função membro pública)
[ operator=](<#/>) | atribui valores à string
(função membro pública)