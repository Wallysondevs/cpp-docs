# std::optional&lt;T&gt;::optional

```cpp
constexpr optional() noexcept;
constexpr optional( std::nullopt_t ) noexcept;  // (1) (desde C++17)
constexpr optional( const optional& other );  // (2) (desde C++17)
constexpr optional( optional&& other ) noexcept(/* see below */);  // (3) (desde C++17)
template < class U >
optional( const optional<U>& other );  // (4) (desde C++17)
(constexpr desde C++20)
(explicit condicionalmente)
template < class U >
optional( optional<U>&& other );  // (5) (desde C++17)
(constexpr desde C++20)
(explicit condicionalmente)
template< class... Args >
constexpr explicit optional( std::in_place_t, Args&&... args );  // (6) (desde C++17)
template< class U, class... Args >
constexpr explicit optional( std::in_place_t,
std::initializer_list<U> ilist,
Args&&... args );  // (7) (desde C++17)
template < class U = T >
constexpr optional( U&& value );  // (8) (desde C++17)
(explicit condicionalmente)
```

  
Constrói um novo objeto optional.

1) Constrói um objeto que _não contém_ um valor.

2) Construtor de cópia: Se other contém um valor, inicializa o valor contido como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `T` com a expressão *other. Se other não contém um valor, constrói um objeto que _não contém_ um valor.

  * Este construtor é definido como deletado se [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;T&gt; for false.
  * É um construtor trivial se [std::is_trivially_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;T&gt; for true.

3) Construtor de movimento: Se other contém um valor, inicializa o valor contido como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `T` com a expressão std::move(*other) e _não_ torna other vazio: um `std::optional` do qual se moveu ainda _contém_ um valor, mas o valor em si foi movido. Se other não contém um valor, constrói um objeto que _não contém_ um valor.

  * Este construtor não participa da resolução de sobrecarga a menos que [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; seja true.
  * É um construtor trivial se [std::is_trivially_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; for true.

4) Construtor de cópia de conversão: Se other não contém um valor, constrói um objeto optional que _não contém_ um valor. Caso contrário, constrói um objeto optional que _contém_ um valor, inicializado como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `T` com a expressão *other.

  * Este construtor não participa da resolução de sobrecarga a menos que as seguintes condições sejam atendidas:
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, const U&> seja true.
    * Se `T` não for (possivelmente cv-qualificado) bool, `T` não é construtível ou conversível a partir de qualquer expressão do tipo (possivelmente const) [std::optional](<#/doc/utility/optional>)<U>, ou seja, os 8 valores a seguir são todos false:
      * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, [std::optional](<#/doc/utility/optional>)<U>&>
      * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, const [std::optional](<#/doc/utility/optional>)<U>&>
      * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, [std::optional](<#/doc/utility/optional>)<U>&&>
      * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, const [std::optional](<#/doc/utility/optional>)<U>&&>
      * [std::is_convertible_v](<#/doc/types/is_convertible>)<[std::optional](<#/doc/utility/optional>)<U>&, T>
      * [std::is_convertible_v](<#/doc/types/is_convertible>)<const [std::optional](<#/doc/utility/optional>)<U>&, T>
      * [std::is_convertible_v](<#/doc/types/is_convertible>)<[std::optional](<#/doc/utility/optional>)<U>&&, T>
      * [std::is_convertible_v](<#/doc/types/is_convertible>)<const [std::optional](<#/doc/utility/optional>)<U>&&, T>
  * Este construtor é explicit se e somente se [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const U&, T&gt; for false.

5) Construtor de movimento de conversão: Se other não contém um valor, constrói um objeto optional que _não contém_ um valor. Caso contrário, constrói um objeto optional que _contém_ um valor, inicializado como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `T` com a expressão std::move(*other).

  * Este construtor não participa da resolução de sobrecarga a menos que as seguintes condições sejam atendidas:
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, U&&> seja true.
    * Se `T` não for (possivelmente cv-qualificado) bool, `T` não é construtível ou conversível a partir de qualquer expressão do tipo (possivelmente const) [std::optional](<#/doc/utility/optional>)<U>, ou seja, os 8 valores a seguir são todos false:
      * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, [std::optional](<#/doc/utility/optional>)<U>&>
      * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, const [std::optional](<#/doc/utility/optional>)<U>&>
      * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, [std::optional](<#/doc/utility/optional>)<U>&&>
      * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, const [std::optional](<#/doc/utility/optional>)<U>&&>
      * [std::is_convertible_v](<#/doc/types/is_convertible>)<[std::optional](<#/doc/utility/optional>)<U>&, T>
      * [std::is_convertible_v](<#/doc/types/is_convertible>)<const [std::optional](<#/doc/utility/optional>)<U>&, T>
      * [std::is_convertible_v](<#/doc/types/is_convertible>)<[std::optional](<#/doc/utility/optional>)<U>&&, T>
      * [std::is_convertible_v](<#/doc/types/is_convertible>)<const [std::optional](<#/doc/utility/optional>)<U>&&, T>
  * Este construtor é explicit se e somente se [std::is_convertible_v](<#/doc/types/is_convertible>)<U&&, T> for false.

6) Constrói um objeto optional que _contém_ um valor, inicializado como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `T` a partir dos argumentos [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

  * Se o construtor selecionado de `T` for um construtor constexpr, este construtor é um construtor constexpr.
  * A função não participa da resolução de sobrecarga a menos que [std::is_constructible_v](<#/doc/types/is_constructible>)<T, Args...> seja true.

7) Constrói um objeto optional que _contém_ um valor, inicializado como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (mas não inicializando diretamente por lista) um objeto do tipo `T` a partir dos argumentos ilist, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

  * Se o construtor selecionado de `T` for um construtor constexpr, este construtor é um construtor constexpr.
  * A função não participa da resolução de sobrecarga a menos que [std::is_constructible_v](<#/doc/types/is_constructible>)<T, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, Args...> seja true.

8) Constrói um objeto optional que _contém_ um valor, inicializado como se estivesse [inicializando diretamente](<#/doc/language/direct_initialization>) (but not direct-list-initializing) um objeto do tipo `T` com a expressão [std::forward](<#/doc/utility/forward>)&lt;U&gt;(value).

  * Se o construtor selecionado de `T` for um construtor constexpr, este construtor é um construtor constexpr.
  * Este construtor não participa da resolução de sobrecarga a menos que as seguintes condições sejam atendidas:
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, U&&> seja true.
    * [std::decay_t](<#/doc/types/decay>)<U>(até C++20)[std::remove_cvref_t](<#/doc/types/remove_cvref>)<U>(desde C++20) não é nem [std::in_place_t](<#/doc/utility/in_place>) nem [std::optional](<#/doc/utility/optional>)<T>.
    * Se `T` for (possivelmente cv-qualificado) bool, [std::decay_t](<#/doc/types/decay>)<U>(até C++20)[std::remove_cvref_t](<#/doc/types/remove_cvref>)<U>(desde C++20) não é uma especialização de `std::optional`.
  * Este construtor é explicit se e somente se [std::is_convertible_v](<#/doc/types/is_convertible>)<U&&, T> for false.

### Parâmetros

other  |  \-  |  outro objeto optional cujo valor contido é copiado   
---|---|---
value  |  \-  |  valor com o qual inicializar o valor contido   
args...  |  \-  |  argumentos com os quais inicializar o valor contido   
ilist  |  \-  |  initializer list com a qual inicializar o valor contido   
  
### Exceções

2) Lança qualquer exceção lançada pelo construtor de `T`.

3) Lança qualquer exceção lançada pelo construtor de `T`. Possui a seguinte 

[`noexcept`](<#/doc/language/noexcept_spec>) especificação: 

noexcept([std::is_nothrow_move_constructible](<#/doc/types/is_move_constructible>)&lt;T&gt;::value)

4-8) Lança qualquer exceção lançada pelo construtor de `T`.

### [Guias de dedução](<#/doc/utility/optional/deduction_guides>)

### Notas

Antes da resolução do [LWG issue 3836](<https://cplusplus.github.io/LWG/issue3836>), construir um [std::optional](<#/doc/utility/optional>)&lt;bool&gt; a partir de [std::optional](<#/doc/utility/optional>)&lt;U&gt; selecionaria a sobrecarga ([8](<#/doc/utility/optional/optional>)) em vez das sobrecargas ([4,5](<#/doc/utility/optional/optional>)) se `U` não fosse bool. Isso ocorre porque as sobrecargas ([4,5](<#/doc/utility/optional/optional>)) não participavam da resolução de sobrecarga se `T` (bool neste caso) pudesse ser construído ou convertido a partir de [std::optional](<#/doc/utility/optional>)&lt;U&gt;, mas [`std::optional::operator bool`](<#/doc/utility/optional/operator_bool>) torna a conversão possível para qualquer `U`.

Como resultado, o [std::optional](<#/doc/utility/optional>)&lt;bool&gt; construído sempre contém um valor. Esse valor é determinado se o objeto [std::optional](<#/doc/utility/optional>)&lt;U&gt; fornecido contém um valor, em vez do valor bool inicializado diretamente a partir do valor contido:
```
    std::optional<bool> op_false(false);
    std::optional<int> op_zero(0);
     
    std::optional<int> from_bool(op_false); // OK: contains 0 (initialized from false)
    std::optional<bool> from_int(op_zero);  // DEFECT (LWG 3836): contains true because
                                            // op_zero contains a value, even if initializing
                                            // bool from that value gives false
```

```cpp
Macro de teste de recurso  | Valor | Std | Recurso
`__cpp_lib_optional` | `202106L`  // (C++20)
(DR20) | Totalmente constexpr (4,5)
```
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <optional>
    #include <string>
     
    int main()
    {
        std::optional<int> o1, // empty
                           o2 = 1, // init from rvalue
                           o3 = o2; // copy-constructor
     
        // calls std::string( initializer_list<CharT> ) constructor
        std::optional<std::string> o4(std::in_place, {'a', 'b', 'c'});
     
        // calls std::string( size_type count, CharT ch ) constructor
        std::optional<std::string> o5(std::in_place, 3, 'A');
     
        // Move-constructed from std::string using deduction guide to pick the type
     
        std::optional o6(std::string{"deduction"});
     
        std::cout << *o2 << ' ' << *o3 << ' ' << *o4 << ' ' << *o5  << ' ' << *o6 << '\n';
    }
```

Saída: 
```
    1 1 abc AAA deduction
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3836](<https://cplusplus.github.io/LWG/issue3836>) | C++17  | ao construir um [std::optional](<#/doc/utility/optional>)&lt;bool&gt;  
a partir de [std::optional](<#/doc/utility/optional>)&lt;U&gt;, a resolução de sobrecarga  
selecionaria a sobrecarga ([8](<#/doc/utility/optional/optional>)) se `U` não fosse bool | sempre seleciona o  
construtor de cópia/movimento  
de conversão neste caso   
[P0602R4](<https://wg21.link/P0602R4>) | C++17  | construtores de cópia/movimento podem não ser triviais  
mesmo que o construtor subjacente seja trivial  | exigido para  
propagar a trivialidade   
[P2231R1](<https://wg21.link/P0602R4>) | C++20  | construtores de conversão ([4,5](<#/doc/utility/optional/optional>)) de outro `std::optional` não eram  
constexpr, enquanto as operações necessárias podem ser em C++20  | tornados constexpr  
  
### Veja também

[ make_optional](<#/doc/utility/optional/make_optional>)(C++17) |  cria um objeto `optional`   
(modelo de função)  