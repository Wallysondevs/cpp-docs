# std::basic_string&lt;CharT,Traits,Allocator&gt;::basic_string

```cpp
  // (1)
basic_string() : basic_string(Allocator()) {}  // (desde C++11)
(até C++17)
basic_string() noexcept(noexcept(Allocator()))
: basic_string(Allocator()) {}  // (desde C++17)
(constexpr desde C++20)
  // (2)
explicit basic_string( const Allocator& alloc = Allocator() );  // (até C++11)
explicit basic_string( const Allocator& alloc ); |  | (noexcept desde C++17)
(constexpr desde C++20)
basic_string( size_type count, CharT ch,
const Allocator& alloc = Allocator() ); |  (3) | (constexpr desde C++20)
template< class InputIt >
basic_string( InputIt first, InputIt last,
const Allocator& alloc = Allocator() ); |  (4) | (constexpr desde C++20)
template< container-compatible-range<CharT> R >
constexpr basic_string( std::from_range_t, R&& rg,
const Allocator& = Allocator());  // (5) (desde C++23)
basic_string( const CharT* s, size_type count,
const Allocator& alloc = Allocator() ); |  (6) | (constexpr desde C++20)
basic_string( const CharT* s, const Allocator& alloc = Allocator() ); |  (7) | (constexpr desde C++20)
basic_string( std::nullptr_t ) = delete;  // (8) (desde C++23)
template< class StringViewLike >
explicit basic_string( const StringViewLike& t,
const Allocator& alloc = Allocator() );  // (9) (desde C++17)
(constexpr desde C++20)
template< class StringViewLike >
basic_string( const StringViewLike& t,
size_type pos, size_type count,
const Allocator& alloc = Allocator() );  // (10) (desde C++17)
basic_string( const basic_string& other ); |  (11) | (constexpr desde C++20)
basic_string( basic_string&& other ) noexcept;  // (12) (desde C++11)
(constexpr desde C++20)
basic_string( const basic_string& other, const Allocator& alloc );  // (13) (desde C++11)
(constexpr desde C++20)
basic_string( basic_string&& other, const Allocator& alloc );  // (14) (desde C++11)
(constexpr desde C++20)
basic_string( const basic_string& other, size_type pos,
const Allocator& alloc = Allocator() ); |  (15) | (constexpr desde C++20)
constexpr basic_string( basic_string&& other, size_type pos,
const Allocator& alloc = Allocator() );  // (16) (desde C++23)
basic_string( const basic_string& other,
size_type pos, size_type count,
const Allocator& alloc = Allocator() ); |  (17) | (constexpr desde C++20)
constexpr basic_string( basic_string&& other,
size_type pos, size_type count,
const Allocator& alloc = Allocator() );  // (18) (desde C++23)
basic_string( std::initializer_list<CharT> ilist,
const Allocator& alloc = Allocator() );  // (19) (desde C++11)
(constexpr desde C++20)
```

  
Constrói uma nova string a partir de uma variedade de fontes de dados e, opcionalmente, usando o alocador `alloc` fornecido pelo usuário.

1) O construtor padrão desde C++11. Constrói uma string vazia com um alocador construído por padrão.

Se `Allocator` não for [DefaultConstructible](<#/doc/named_req/DefaultConstructible>), o comportamento é indefinido.

2) O construtor padrão até C++11. Constrói uma string vazia com o alocador `alloc` fornecido.

3) Constrói uma string com `count` cópias do caractere `ch`. Se `CharT` não for [CopyInsertable](<#/doc/named_req/CopyInsertable>) em [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;, o comportamento é indefinido. | (desde C++11)  
---|---
Esta sobrecarga participa da resolução de sobrecarga apenas se `Allocator` satisfizer os requisitos de [Allocator](<#/doc/named_req/Allocator>). | (desde C++17)  
  
4) Constrói uma string com o conteúdo do range `[`first`, `last`)`. Cada iterator em `[`first`, `last`)` é desreferenciado exatamente uma vez. Se `InputIt` não satisfizer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>), a sobrecarga (3) é chamada em vez disso com os argumentos static_cast<size_type>(first), last e alloc. | (até C++11)  
---|---
Esta sobrecarga participa da resolução de sobrecarga apenas se `InputIt` satisfizer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>). Se `CharT` não for [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt; a partir de *first, o comportamento é indefinido. | (desde C++11)  
  
5) Constrói uma string com o conteúdo do range `rg`. Cada iterator em `rg` é desreferenciado exatamente uma vez.

Se `CharT` não for [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt; a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg), o comportamento é indefinido.

6) Constrói uma string com o conteúdo do range `[`s`, `s + count`)`.

Se `[`s`, `s + count`)` não for um range válido, o comportamento é indefinido.

7) Equivalente a basic_string(s, Traits::length(s), alloc). Esta sobrecarga participa da resolução de sobrecarga apenas se `Allocator` satisfizer os requisitos de [Allocator](<#/doc/named_req/Allocator>). | (desde C++17)  
  
8) `std::basic_string` não pode ser construída a partir de nullptr.

9) Converte implicitamente `t` para um string view `sv` como se por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;, então constrói uma string como se por basic_string(sv.data(), sv.size(), alloc).

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&,  
[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for true e [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const StringViewLike&, const CharT*&gt; for false.

10) Converte implicitamente `t` para um string view `sv` como se por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;, então constrói uma string como se por basic_string(sv.substr(pos, n), alloc).

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&,  
[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for true.

11-18) Constrói uma string com (parte do) conteúdo de `other`. Se o tipo de `other` for `basic_string&&`, quando a construção terminar, `other` estará em um estado válido, mas não especificado.

11) O construtor de cópia. O alocador é obtido como se por chamar [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::  
select_on_container_copy_construction  
(other.get_allocator()). | (desde C++11)  
  
12) O construtor de movimento. O alocador é obtido por construção de movimento a partir de other.get_allocator().

13) O mesmo que o construtor de cópia, exceto que `alloc` é usado como o alocador.

Se `CharT` não for [CopyInsertable](<#/doc/named_req/CopyInsertable>) em [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;, o comportamento é indefinido.

14) O mesmo que o construtor de movimento, exceto que `alloc` é usado como o alocador.

Se `CharT` não for [MoveInsertable](<#/doc/named_req/MoveInsertable>) em [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;, o comportamento é indefinido.

15,16) Constrói uma string com o conteúdo do range `[`other.data() + pos`, `other.data() + other.size()`)`.

17,18) Constrói uma string com o conteúdo do range `[`other.data() + pos`, `other.data() + (pos + [std::min](<#/doc/algorithm/min>)(count, other.size() - pos))`)`.

19) Equivalente a basic_string(ilist.begin(), ilist.end()).

### Parâmetros

alloc  |  \-  |  alocador a ser usado para todas as alocações de memória desta string   
---|---|---
count  |  \-  |  tamanho da string resultante   
ch  |  \-  |  valor para inicializar a string   
pos  |  \-  |  posição do primeiro caractere a ser incluído   
first, last  |  \-  |  range de onde copiar os caracteres   
s  |  \-  |  ponteiro para um array de caracteres a ser usado como fonte para inicializar a string   
other  |  \-  |  outra string a ser usada como fonte para inicializar a string   
ilist  |  \-  |  [std::initializer_list](<#/doc/utility/initializer_list>) para inicializar a string   
t  |  \-  |  objeto (convertível para [std::basic_string_view](<#/doc/string/basic_string_view>)) para inicializar a string   
rg  |  \-  |  um range compatível com container   
  
### Complexidade

1,2) Constante.

3-7) Linear no tamanho da string.

9-11) Linear no tamanho da string.

12) Constante.

13) Linear no tamanho da string.

14) Linear no tamanho da string se alloc != other.get_allocator() for true, caso contrário, constante.

15-19) Linear no tamanho da string.

### Exceções

10) [std::out_of_range](<#/doc/error/out_of_range>) se `pos` estiver fora do range.

14) Não lança nada se alloc == str.get_allocator() for true.

15-18) [std::out_of_range](<#/doc/error/out_of_range>) se pos > other.size() for true.

Lança [std::length_error](<#/doc/error/length_error>) se o comprimento da string construída exceder [max_size()](<#/doc/string/basic_string/max_size>) (por exemplo, se count > max_size() para (3)). Chamadas para `Allocator::allocate` podem lançar exceções.

Se uma exceção for lançada por qualquer motivo, essas funções não terão efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Observações

A inicialização com um [literal de string](<#/doc/language/string_literal>) que contém caracteres '\0' incorporados usa a sobrecarga (7), que para no primeiro caractere nulo. Isso pode ser evitado especificando um construtor diferente ou usando [`operator""s`](<#/doc/string/basic_string/operator_q__q_s>):
```cpp
    std::string s1 = "ab\0\0cd";   // s1 contains "ab"
    std::string s2{"ab\0\0cd", 6}; // s2 contains "ab\0\0cd"
    std::string s3 = "ab\0\0cd"s;  // s3 contains "ab\0\0cd"
```

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construtor marcado (5) para construir a partir de [range compatível com container](<#/doc/ranges/to>)  
  
### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cctype>
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <string>
     
    int main()
    {
        std::cout << "1)  string(); ";
        std::string s1;
        assert(s1.empty() && (s1.length() == 0) && (s1.size() == 0));
        std::cout << "s1.capacity(): " << s1.capacity() << '\n'; // unspecified
     
        std::cout << "3)  string(size_type count, CharT ch): ";
        std::string s2(4, '=');
        std::cout << std::quoted(s2) << '\n'; // "===="
     
        std::cout << "4)  string(InputIt first, InputIt last): ";
        char mutable_c_str[] = "another C-style string";
        std::string s4(std::begin(mutable_c_str) + 8, std::end(mutable_c_str) - 1);
        std::cout << std::quoted(s4) << '\n'; // "C-style string"
     
        std::cout << "6)  string(CharT const* s, size_type count): ";
        std::string s6("C-style string", 7);
        std::cout << std::quoted(s6) << '\n'; // "C-style", i.e. [0, 7)
     
        std::cout << "7)  string(CharT const* s): ";
        std::string s7("C-style\0string");
        std::cout << std::quoted(s7) << '\n'; // "C-style"
     
        std::cout << "11) string(string&): ";
        std::string const other11("Exemplar");
        std::string s11(other11);
        std::cout << std::quoted(s11) << '\n'; // "Exemplar"
     
        std::cout << "12) string(string&&): ";
        std::string s12(std::string("C++ by ") + std::string("example"));
        std::cout << std::quoted(s12) << '\n'; // "C++ by example"
     
        std::cout << "15) string(const string& other, size_type pos): ";
        std::string const other15("Mutatis Mutandis");
        std::string s15(other15, 8);
        std::cout << std::quoted(s15) << '\n'; // "Mutandis", i.e. [8, 16)
     
        std::cout << "17) string(const string& other, size_type pos, size_type count): ";
        std::string const other17("Exemplary");
        std::string s17(other17, 0, other17.length() - 1);
        std::cout << std::quoted(s17) << '\n'; // "Exemplar"
     
        std::cout << "19) string(std::initializer_list<CharT>): ";
        std::string s19({'C', '-', 's', 't', 'y', 'l', 'e'});
        std::cout << std::quoted(s19) << '\n'; // "C-style"
    }
```

Saída possível:
```
    1)  string(); s1.capacity(): 15
    3)  string(size_type count, CharT ch): "===="
    4)  string(InputIt first, InputIt last): "C-style string"
    6)  string(CharT const* s, size_type count): "C-style"
    7)  string(CharT const* s): "C-style"
    11) string(string&): "Exemplar"
    12) string(string&&): "C++ by example"
    15) string(const string& other, size_type pos): "Mutandis"
    17) string(const string& other, size_type pos, size_type count): "Exemplar"
    19) string(std::initializer_list<CharT>): "C-style"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 301](<https://cplusplus.github.io/LWG/issue301>) | C++98  | a sobrecarga (4) não usava o parâmetro  
alloc se `InputIt` fosse um tipo integral  | usar esse parâmetro   
[LWG 438](<https://cplusplus.github.io/LWG/issue438>) | C++98  | a sobrecarga (4) chamaria a sobrecarga (3)  
apenas se `InputIt` fosse um tipo integral  | chama a sobrecarga (3) se `InputIt`  
não for um [LegacyInputIterator](<#/doc/named_req/InputIterator>)  
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98  | não havia garantia de segurança de exceção  | adicionada garantia de segurança de exceção forte   
---|---|---|---
[LWG 2193](<https://cplusplus.github.io/LWG/issue2193>) | C++11  | o construtor padrão é explícito  | tornado não explícito   
[LWG 2235](<https://cplusplus.github.io/LWG/issue2235>) | C++98  | s poderia ser um valor de ponteiro nulo  | o comportamento é indefinido neste caso   
[LWG 2250](<https://cplusplus.github.io/LWG/issue2250>) | C++98  | o comportamento da sobrecarga (17) era indefinido  
se pos > other.size() fosse true | sempre lança uma  
exceção neste caso   
[LWG 2583](<https://cplusplus.github.io/LWG/issue2583>) | C++98  | não havia como fornecer um alocador para a sobrecarga (17) | adicionada sobrecarga (15)  
[LWG 2946](<https://cplusplus.github.io/LWG/issue2946>) | C++17  | a sobrecarga (9) causa ambiguidade em alguns casos  | evitada tornando-a um template   
[LWG 3076](<https://cplusplus.github.io/LWG/issue3076>) | C++17  | as sobrecargas (3,7) podem causar ambiguidades  
na dedução de argumentos de template de classe  | restritas   
[LWG 3111](<https://wg21.link/P1148R0>))  | C++98  | a resolução do [problema LWG 2235](<https://cplusplus.github.io/LWG/issue2235>) tornou o  
comportamento de basic_string(nullptr, 0) indefinido  | o comportamento é bem  
definido neste caso[1](<#/doc/string/basic_string/basic_string>)  
  1. [↑](<#/doc/string/basic_string/basic_string>) `[`nullptr`, `nullptr + 0`)` é um range vazio válido, porque adicionar zero a um valor de ponteiro nulo também é [bem definido](<#/doc/language/operator_arithmetic>) (o resultado ainda é um valor de ponteiro nulo).

### Veja também

[ assign](<#/doc/string/basic_string/assign>) | atribui caracteres a uma string   
(função membro pública)  
[ operator=](<#/>) | atribui valores à string   
(função membro pública)  
[ to_string](<#/doc/string/basic_string/to_string>)(C++11) | converte um valor integral ou de ponto flutuante para `string`   
(função)  
[ to_wstring](<#/doc/string/basic_string/to_wstring>)(C++11) | converte um valor integral ou de ponto flutuante para `wstring`   
(função)  
[ (constructor)](<#/doc/string/basic_string_view/basic_string_view>) | constrói um `basic_string_view`   
(função membro pública de `std::basic_string_view<CharT,Traits>`)