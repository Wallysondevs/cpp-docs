# std::variant&lt;Types...&gt;::variant

```cpp
constexpr variant() noexcept(/* see below */);  // (1) (desde C++17)
constexpr variant( const variant& other );  // (2) (desde C++17)
constexpr variant( variant&& other ) noexcept(/* see below */);  // (3) (desde C++17)
template< class T >
constexpr variant( T&& t ) noexcept(/* see below */);  // (4) (desde C++17)
template< class T,
class... Args >
constexpr explicit variant( std::in_place_type_t<T>,
Args&&... args );  // (5) (desde C++17)
template< class T,
class U,
class... Args >
constexpr explicit variant( std::in_place_type_t<T>,
std::initializer_list<U> il,
Args&&... args );  // (6) (desde C++17)
template< std::size_t I,
class... Args >
constexpr explicit variant( std::in_place_index_t<I>,
Args&&... args );  // (7) (desde C++17)
template< std::size_t I,
class U,
class... Args >
constexpr explicit variant( std::in_place_index_t<I>,
std::initializer_list<U> il,
Args&&... args );  // (8) (desde C++17)
```

Constrói um novo objeto `variant`.

1) Construtor padrão. Constrói um `variant` contendo o valor [inicializado por valor](<#/doc/language/value_initialization>) da primeira alternativa ([index()](<#/doc/utility/variant/index>) é zero).

  * Este construtor é constexpr se e somente se a inicialização por valor do tipo alternativo `T_0` satisfizer os requisitos para uma [função constexpr](<#/doc/language/constexpr>).
  * Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)<T_0> for true.

2) Construtor de cópia. Se `other` não for [valueless_by_exception](<#/doc/utility/variant/valueless_by_exception>), constrói um `variant` contendo a mesma alternativa que `other` e [inicializa diretamente](<#/doc/language/direct_initialization>) o valor contido com *[std::get_if](<#/doc/utility/variant/get_if>)<other.index()>([std::addressof](<#/doc/memory/addressof>)(other)). Caso contrário, inicializa um `variant` [valueless_by_exception](<#/doc/utility/variant/valueless_by_exception>).

  * Este construtor é definido como deletado a menos que [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)<T_i> seja true para todos os `T_i` em Types....
  * É trivial se [std::is_trivially_copy_constructible_v](<#/doc/types/is_copy_constructible>)<T_i> for true para todos os `T_i` em Types....

3) Construtor de movimento. Se `other` não for [valueless_by_exception](<#/doc/utility/variant/valueless_by_exception>), constrói um `variant` contendo a mesma alternativa que `other` e [inicializa diretamente](<#/doc/language/direct_initialization>) o valor contido com std::move(*[std::get_if](<#/doc/utility/variant/get_if>)<other.index()>([std::addressof](<#/doc/memory/addressof>)(other))). Caso contrário, inicializa um `variant` [valueless_by_exception](<#/doc/utility/variant/valueless_by_exception>).

  * Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)<T_i> for true para todos os `T_i` em Types....
  * É trivial se [std::is_trivially_move_constructible_v](<#/doc/types/is_move_constructible>)<T_i> for true para todos os `T_i` em Types....

4) Construtor de conversão. Constrói um `variant` contendo o tipo alternativo `T_j` que seria selecionado pela resolução de sobrecarga para a expressão F([std::forward](<#/doc/utility/forward>)&lt;T&gt;(t)) se houvesse uma sobrecarga da função imaginária `F(T_i)` para cada `T_i` em Types..., exceto que conversões de estreitamento (narrowing conversions) não são consideradas.

Formalmente:

  * Uma sobrecarga `F(T_i)` é considerada somente se a declaração `T_i x[] = { [std::forward](<#/doc/utility/forward>)<T>(t) };` for válida para alguma variável `x` inventada.

[Inicializa diretamente](<#/doc/language/direct_initialization>) o valor contido como se fosse por inicialização direta não-por-lista de [std::forward](<#/doc/utility/forward>)&lt;T&gt;(t).

  * Esta sobrecarga participa da resolução de sobrecarga somente se
    * sizeof...(Types) > 0,
    * [std::decay_t](<#/doc/types/decay>)<T>(até C++20)[std::remove_cvref_t](<#/doc/types/remove_cvref>)<T>(desde C++20) não for o mesmo tipo que `variant`, nem uma especialização de [std::in_place_type_t](<#/doc/utility/in_place>), nem uma especialização de [std::in_place_index_t](<#/doc/utility/in_place>),
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<T_j, T> for true,
    * e a expressão F([std::forward](<#/doc/utility/forward>)<T>(t)) (sendo F o conjunto de funções imaginárias mencionado acima) for bem formada.
  * Este construtor é um construtor constexpr se o construtor selecionado de `T_j` for um construtor constexpr.

```cpp
    std::variant<std::string> v("abc"); // OK
    std::variant<std::string, std::string> w("abc"); // ill-formed
    std::variant<std::string, const char*> x("abc"); // OK, chooses const char*
    std::variant<std::string, bool> y("abc"); // OK, chooses string; bool is not a candidate
    std::variant<float, long, double> z = 0; // OK, holds long
                                             // float and double are not candidates
```

5) Constrói um `variant` com a alternativa `T` especificada e inicializa o valor contido com os argumentos [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

  * Se o construtor selecionado de `T` for um construtor constexpr, este construtor também é um construtor constexpr.
  * Esta sobrecarga participa da resolução de sobrecarga somente se houver exatamente uma ocorrência de `T` em Types... e [std::is_constructible_v](<#/doc/types/is_constructible>)<T, Args...> for true.

6) Constrói um `variant` com a alternativa `T` especificada e inicializa o valor contido com os argumentos `il`, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

  * Se o construtor selecionado de `T` for um construtor constexpr, este construtor também é um construtor constexpr.
  * Esta sobrecarga participa da resolução de sobrecarga somente se houver exatamente uma ocorrência de `T` em Types... e [std::is_constructible_v](<#/doc/types/is_constructible>)<T, initializer_list&lt;U&gt;&, Args...> for true.

7) Constrói um `variant` com a alternativa `T_i` especificada pelo índice `I` e inicializa o valor contido com os argumentos [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

  * Se o construtor selecionado de `T_i` for um construtor constexpr, este construtor também é um construtor constexpr.
  * Esta sobrecarga participa da resolução de sobrecarga somente se `I < sizeof...(Types)` e [std::is_constructible_v](<#/doc/types/is_constructible>)<T_i, Args...> for true.

8) Constrói um `variant` com a alternativa `T_i` especificada pelo índice `I` e inicializa o valor contido com os argumentos `il`, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

  * Se o construtor selecionado de `T_i` for um construtor constexpr, este construtor também é um construtor constexpr.
  * Esta sobrecarga participa da resolução de sobrecarga somente se `I < sizeof...(Types)` e [std::is_constructible_v](<#/doc/types/is_constructible>)<T_i, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, Args...> for true.

### Parameters

- **other** — outro objeto `variant` cujo valor contido deve ser copiado/movido
- **t** — valor para inicializar o valor contido
- **args...** — argumentos para inicializar o valor contido
- **il** — lista de inicializadores para inicializar o valor contido

### Exceptions

1) Pode lançar qualquer exceção lançada pela inicialização por valor da primeira alternativa.

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

noexcept([std::is_nothrow_default_constructible_v](<#/doc/types/is_default_constructible>)<T_0>)

2) Pode lançar qualquer exceção lançada pela inicialização direta de qualquer `T_i` em Types....

3) Pode lançar qualquer exceção lançada pela construção por movimento de qualquer `T_i` em Types....

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

noexcept(([std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;Types&gt; && ...))

4) Pode lançar qualquer exceção lançada pela inicialização da alternativa `T_j` selecionada.

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

noexcept([std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<T_j, T>)

5-8) Pode lançar qualquer exceção lançada ao chamar o construtor selecionado da alternativa selecionada.

### Notes

A MSVC STL inicialmente tratou [P0608R3](<https://wg21.link/P0608R3>) como uma mudança no C++20. A partir do VS 2022 17.12, a MSVC STL também trata P0608R3 como um relatório de defeito contra o C++17.

### Example

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <string>
    #include <variant>
    #include <vector>
    
    using vector_t = std::vector<int>;
    
    auto& operator<<(auto& out, const vector_t& v)
    {
        out << "{ ";
        for (int e : v)
            out << e << ' ';
        return out << '}';
    }
    
    int main()
    {
        // value-initializes first alternative
        std::variant<int, std::string> var0;
        assert(std::holds_alternative<int>(var0) and
               var0.index() == 0 and
               std::get<int>(var0) == 0);
    
        // initializes first alternative with std::string{"STR"};
        std::variant<std::string, int> var1{"STR"};
        assert(var1.index() == 0);
        std::cout << "1) " << std::get<std::string>(var1) << '\n';
    
        // initializes second alternative with int == 42;
        std::variant<std::string, int> var2{42};
        assert(std::holds_alternative<int>(var2));
        std::cout << "2) " << std::get<int>(var2) << '\n';
    
        // initializes first alternative with std::string{4, 'A'};
        std::variant<std::string, vector_t, float> var3
        {
            std::in_place_type<std::string>, 4, 'A'
        };
        assert(var3.index() == 0);
        std::cout << "3) " << std::get<std::string>(var3) << '\n';
    
        // initializes second alternative with std::vector{1,2,3,4,5};
        std::variant<std::string, vector_t, char> var4
        {
            std::in_place_type<vector_t>, {1, 2, 3, 4, 5}
        };
        assert(var4.index() == 1);
        std::cout << "4) " << std::get<vector_t>(var4) << '\n';
    
        // initializes first alternative with std::string{"ABCDE", 3};
        std::variant<std::string, vector_t, bool> var5 {std::in_place_index<0>, "ABCDE", 3};
        assert(var5.index() == 0);
        std::cout << "5) " << std::get<std::string>(var5) << '\n';
    
        // initializes second alternative with std::vector(4, 42);
        std::variant<std::string, vector_t, char> var6 {std::in_place_index<1>, 4, 42};
        assert(std::holds_alternative<vector_t>(var6));
        std::cout << "6) " << std::get<vector_t>(var6) << '\n';
    }
```

Output:
```
    1) STR
    2) 42
    3) AAAA
    4) { 1 2 3 4 5 }
    5) ABC
    6) { 42 42 42 42 }
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 2901](<https://cplusplus.github.io/LWG/issue2901>) | C++17 | construtores com reconhecimento de alocador fornecidos, mas `variant` não pode suportar alocadores adequadamente | construtores removidos
[P0739R0](<https://wg21.link/P0739R0>) | C++17 | template de construtor de conversão interage mal com a dedução de argumentos de template de classe | restrição adicionada
[LWG 3024](<https://cplusplus.github.io/LWG/issue3024>) | C++17 | construtor de cópia não participa da resolução de sobrecarga se qualquer tipo membro não for copiável | definido como deletado em vez disso
[P0602R4](<https://wg21.link/P0602R4>) | C++17 | construtores de cópia/movimento podem não ser triviais mesmo se os construtores subjacentes forem triviais | exigido para propagar trivialidade
[P0608R3](<https://wg21.link/P0608R3>) | C++17 | construtor de conversão monta cegamente um conjunto de sobrecargas, levando a conversões não intencionais | conversões de estreitamento e booleanas não consideradas
[P1957R2](<https://wg21.link/P1957R2>) | C++17 | construtor de conversão para bool não permitia conversão implícita | A conversão de ponteiro para bool é de estreitamento e o construtor de conversão não tem exceção para bool