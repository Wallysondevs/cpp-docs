# std::variant&lt;Types...&gt;::operator=

```cpp
constexpr variant& operator=( const variant& rhs );  // (1) (desde C++17)
constexpr variant& operator=( variant&& rhs ) noexcept(/* see below */);  // (2) (desde C++17)
template< class T >
variant& operator=( T&& t ) noexcept(/* see below */);  // (3) (desde C++17)
(constexpr desde C++20)
```

Atribui um novo valor a um objeto `variant` existente.

1) Atribuição por cópia:

  * Se ambos *this e rhs estiverem `valueless by exception`, não faz nada.
  * Caso contrário, se rhs estiver `valueless`, mas *this não, destrói o valor contido em *this e o torna `valueless`.
  * Caso contrário, se rhs contiver a mesma alternativa que *this, atribui o valor contido em rhs ao valor contido em *this. Se uma exceção for lançada, *this não se torna `valueless`: o valor depende da garantia de segurança de exceção da atribuição por cópia da alternativa.
  * Caso contrário, se a alternativa contida em rhs for `nothrow copy constructible` ou _não_ `nothrow move constructible` (conforme determinado por [std::is_nothrow_copy_constructible](<#/doc/types/is_copy_constructible>) e [std::is_nothrow_move_constructible](<#/doc/types/is_move_constructible>), respectivamente), equivalente a this->emplace<rhs.index()>(*[std::get_if](<#/doc/utility/variant/get_if>)<rhs.index()>([std::addressof](<#/doc/memory/addressof>)(rhs))). *this pode se tornar [`valueless_by_exception`](<#/doc/utility/variant/valueless_by_exception>) se uma exceção for lançada na construção por cópia dentro de [`emplace`](<#/doc/utility/variant/emplace>).
  * Caso contrário, equivalente a this->operator=(variant(rhs)).

Esta sobrecarga é definida como deletada a menos que [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)<T_i> e [std::is_copy_assignable_v](<#/doc/types/is_copy_assignable>)<T_i> sejam ambos verdadeiros para todos os `T_i` em `Types...`. Esta sobrecarga é trivial se [std::is_trivially_copy_constructible_v](<#/doc/types/is_copy_constructible>)<T_i>, [std::is_trivially_copy_assignable_v](<#/doc/types/is_copy_assignable>)<T_i> e [std::is_trivially_destructible_v](<#/doc/types/is_destructible>)<T_i> forem todos verdadeiros para todos os `T_i` em `Types...`.

2) Atribuição por movimento (move-assignment):

  * Se ambos *this e rhs estiverem `valueless by exception`, não faz nada.
  * Caso contrário, se rhs estiver `valueless`, mas *this não, destrói o valor contido em *this e o torna `valueless`.
  * Caso contrário, se rhs contiver a mesma alternativa que *this, atribui std::move(*[std::get_if](<#/doc/utility/variant/get_if>)&lt;j&gt;([std::addressof](<#/doc/memory/addressof>)(rhs))) ao valor contido em *this, sendo `j` o `index()`. Se uma exceção for lançada, *this não se torna `valueless`: o valor depende da garantia de segurança de exceção da atribuição por movimento da alternativa.
  * Caso contrário (se rhs e *this contiverem alternativas diferentes), equivalente a this->emplace<rhs.index()>(std::move(*[std::get_if](<#/doc/utility/variant/get_if>)<rhs.index()>([std::addressof](<#/doc/memory/addressof>)(rhs)))). Se uma exceção for lançada pelo construtor de movimento de `T_i`, *this se torna [`valueless_by_exception`](<#/doc/utility/variant/valueless_by_exception>).

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)<T_i> e [std::is_move_assignable_v](<#/doc/types/is_move_assignable>)<T_i> forem ambos verdadeiros para todos os `T_i` em `Types...`. Esta sobrecarga é trivial se [std::is_trivially_move_constructible_v](<#/doc/types/is_move_constructible>)<T_i>, [std::is_trivially_move_assignable_v](<#/doc/types/is_move_assignable>)<T_i> e [std::is_trivially_destructible_v](<#/doc/types/is_destructible>)<T_i> forem todos verdadeiros para todos os `T_i` em `Types...`.

3) Atribuição de conversão.

  * Determina o tipo alternativo `T_j` que seria selecionado pela resolução de sobrecarga para a expressão F([std::forward](<#/doc/utility/forward>)&lt;T&gt;(t)) se houvesse uma sobrecarga da função imaginária F(T_i) para cada `T_i` de `Types...` no escopo ao mesmo tempo, exceto que:

  * Uma sobrecarga F(T_i) é considerada apenas se a declaração T_i x[] = { [std::forward](<#/doc/utility/forward>)&lt;T&gt;(t) }; for válida para alguma variável `x` inventada;

  * Se *this já contiver um `T_j`, atribui [std::forward](<#/doc/utility/forward>)&lt;T&gt;(t) ao valor contido em *this. Se uma exceção for lançada, *this não se torna `valueless`: o valor depende da garantia de segurança de exceção da atribuição chamada.
  * Caso contrário, se [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<T_j, T> || ![std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)<T_j> for verdadeiro, equivalente a this->emplace&lt;j&gt;([std::forward](<#/doc/utility/forward>)&lt;T&gt;(t)). *this pode se tornar [`valueless_by_exception`](<#/doc/utility/variant/valueless_by_exception>) se uma exceção for lançada na inicialização dentro de [`emplace`](<#/doc/utility/variant/emplace>).
  * Caso contrário, equivalente a this->emplace&lt;j&gt;(T_j([std::forward](<#/doc/utility/forward>)&lt;T&gt;(t))).

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::decay_t](<#/doc/types/decay>)&lt;T&gt;(até C++20)[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;T&gt;(desde C++20) não for do mesmo tipo que [`variant`](<#/doc/utility/variant>) e [std::is_assignable_v](<#/doc/types/is_assignable>)<T_j&, T> for verdadeiro e [std::is_constructible_v](<#/doc/types/is_constructible>)<T_j, T> for verdadeiro e a expressão F([std::forward](<#/doc/utility/forward>)&lt;T&gt;(t)) (sendo F o conjunto de funções imaginárias acima mencionado) for bem formada.
```cpp
    std::variant<std::string> v1;
    v1 = "abc"; // OK
    std::variant<std::string, std::string> v2;
    v2 = "abc"; // Error
    std::variant <std::string, bool> v3;
    v3 = "abc"; // OK, chooses string; bool is not a candidate
    std::variant<float, long, double> v4; // holds float
    v4 = 0; // OK, holds long; float and double are not candidates
```

### Parâmetros

- **rhs** — outro `variant`
- **t** — um valor conversível para uma das alternativas do variant

### Valor de retorno

*this

### Exceções

1) Pode lançar qualquer exceção lançada pela atribuição e inicialização por cópia/movimento de qualquer alternativa.

2)

Especificação `noexcept`:

noexcept((([std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;Types&gt; &&
[std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;Types&gt;) && ...))

3)

Especificação `noexcept`:

noexcept([std::is_nothrow_assignable_v](<#/doc/types/is_assignable>)<T_j&, T> &&
[std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<T_j, T>)

### Notas

```cpp
Macro de teste de recurso | Valor | Std | Recurso
`__cpp_lib_variant` | `202106L`  // (C++20)
(DR) | `std::variant` totalmente constexpr (3)
```

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <type_traits>
    #include <variant>
    
    std::ostream& operator<<(std::ostream& os, std::variant<int, std::string> const& va)
    {
        os << ": { ";
    
        std::visit(&
        {
            using T = std::decay_t<decltype(arg)>;
            if constexpr (std::is_same_v<T, int>)
                os << arg;
            else if constexpr (std::is_same_v<T, std::string>)
                os << std::quoted(arg);
        }, va);
    
        return os << " };\n";
    }
    
    int main()
    {
        std::variant<int, std::string> a{2017}, b{"CppCon"};
        std::cout << "a" << a << "b" << b << '\n';
    
        std::cout << "(1) operator=( const variant& rhs )\n";
        a = b;
        std::cout << "a" << a << "b" << b << '\n';
    
        std::cout << "(2) operator=( variant&& rhs )\n";
        a = std::move(b);
        std::cout << "a" << a << "b" << b << '\n';
    
        std::cout << "(3) operator=( T&& t ), where T is int\n";
        a = 2019;
        std::cout << "a" << a << '\n';
    
        std::cout << "(3) operator=( T&& t ), where T is std::string\n";
        std::string s{"CppNow"};
        std::cout << "s: " << std::quoted(s) << '\n';
        a = std::move(s);
        std::cout << "a" << a << "s: " << std::quoted(s) << '\n';
    }
```

Saída possível:
```
    a: { 2017 };
    b: { "CppCon" };
    
    (1) operator=( const variant& rhs )
    a: { "CppCon" };
    b: { "CppCon" };
    
    (2) operator=( variant&& rhs )
    a: { "CppCon" };
    b: { "" };
    
    (3) operator=( T&& t ), where T is int
    a: { 2019 };
    
    (3) operator=( T&& t ), where T is std::string
    s: "CppNow"
    a: { "CppNow" };
    s: ""
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3024](<https://cplusplus.github.io/LWG/issue3024>) | C++17 | operador de atribuição por cópia não participa da resolução de sobrecarga se qualquer tipo membro não for copiável | definido como deletado em vez disso
[LWG 3585](<https://cplusplus.github.io/LWG/issue3585>) | C++17 | atribuição de conversão era às vezes inesperadamente malformada porque não havia atribuição por movimento disponível | tornada bem formada
[P0602R4](<https://wg21.link/P0602R4>) | C++17 | atribuição por cópia/movimento pode não ser trivial mesmo que as operações subjacentes sejam triviais | exigido para propagar trivialidade
[P0608R3](<https://wg21.link/P0608R3>) | C++17 | atribuição de conversão monta cegamente um conjunto de sobrecargas, levando a conversões não intencionais | conversões de estreitamento e booleanas não consideradas
[P2231R1](<https://wg21.link/P2231R1>) | C++20 | atribuição de conversão ([3](<#/>)) não era constexpr enquanto as operações necessárias podem ser constexpr em C++20 | tornada constexpr

### Veja também

[ emplace](<#/doc/utility/variant/emplace>) | constrói um valor no `variant`, no local
(função membro pública)