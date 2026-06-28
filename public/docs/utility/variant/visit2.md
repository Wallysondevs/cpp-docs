# std::visit

Definido no cabeçalho `[<variant>](<#/doc/header/variant>)`

```c
template< class Visitor, class... Variants >
constexpr /* see below */ visit( Visitor&& v, Variants&&... values );
template< class R, class Visitor, class... Variants >
constexpr R visit( Visitor&& v, Variants&&... values );
template< class... Ts >
auto&& as-variant( std::variant<Ts...>& value );
template< class... Ts >
auto&& as-variant( const std::variant<Ts...>& value );
template< class... Ts >
auto&& as-variant( std::variant<Ts...>&& value );
template< class... Ts >
auto&& as-variant( const std::variant<Ts...>&& value );
```

Aplica o visitor v (um [Callable](<#/doc/named_req/Callable>) que pode ser chamado com qualquer combinação de tipos de Variants) aos valores de Variants.

Dado `VariantBases` como decltype(`_as-variant_`([std::forward](<#/doc/utility/forward>)&lt;Variants&gt;(values))... (um pack de sizeof...(Variants) tipos):

1) Invoca v como se por

[`_INVOKE_`](<#/doc/utility/functional>)([std::forward](<#/doc/utility/forward>)&lt;Visitor&gt;(v),
std::get&lt;indices&gt;([std::forward](<#/doc/utility/forward>)&lt;VariantBases&gt;(values))...),

onde indices é `_as-variant_`(values).index()....

2) Invoca v como se por

[`_INVOKE <R>_`](<#/doc/utility/functional>)([std::forward](<#/doc/utility/forward>)&lt;Visitor&gt;(v),
std::get&lt;indices&gt;([std::forward](<#/doc/utility/forward>)&lt;VariantBases&gt;(values))...),

onde indices é `_as-variant_`(values).index()....

Essas sobrecargas participam da resolução de sobrecarga apenas se cada tipo em `VariantBases` for um tipo válido. Se a expressão denotada por [`_INVOKE_`](<#/doc/utility/functional>) ou [`_INVOKE <R>_`](<#/doc/utility/functional>)(desde C++20) for inválida, ou os resultados de [`_INVOKE_`](<#/doc/utility/functional>) ou [`_INVOKE <R>_`](<#/doc/utility/functional>)(desde C++20) tiverem tipos ou categorias de valor diferentes para índices diferentes, o programa é malformado.

3-6) Os templates de função `_as-variant_` apenas para exposição aceitam um valor cujo tipo pode ser [deduzido](<#/doc/language/template_argument_deduction>) para [std::variant](<#/doc/utility/variant>)<Ts...> (ou seja, [std::variant](<#/doc/utility/variant>)<Ts...> ou um tipo derivado de [std::variant](<#/doc/utility/variant>)<Ts...>), e retornam o valor [std::variant](<#/doc/utility/variant>) com a mesma qualificação const e categoria de valor.

3,4) Retorna value.

5,6) Retorna std::move(value).

### Parâmetros

- **v** — um [Callable](<#/doc/named_req/Callable>) que aceita todas as alternativas possíveis de cada variant em Variants
- **values** — lista de variants para passar ao visitor

### Valor de retorno

1) O resultado da operação [`_INVOKE_`](<#/doc/utility/functional>). O tipo de retorno é o tipo obtido ao aplicar [`decltype`](<#/doc/language/decltype>) ao resultado.

2) Nada se `R` for void (possivelmente cv-qualificado); caso contrário, o resultado da operação [`_INVOKE <R>_`](<#/doc/utility/functional>).

3-6) Um valor [std::variant](<#/doc/utility/variant>) convertido de value.

### Exceções

Lança [std::bad_variant_access](<#/doc/utility/variant/bad_variant_access>) se `_as-variant_`(value_i).valueless_by_exception() for verdadeiro para qualquer variant value_i em values.

### Complexidade

Quando o número de variants é zero ou um, a invocação do objeto callable é implementada em tempo constante; ou seja, não depende do número de tipos que podem ser armazenados na variant.

Se o número de variants for maior que um, a invocação do objeto callable não possui requisitos de complexidade.

### Notas

Seja n igual a (1 * ... * [std::variant_size_v](<#/doc/utility/variant/variant_size>)<[std::remove_reference_t](<#/doc/types/remove_reference>)&lt;VariantBases&gt;>), as implementações geralmente geram uma tabela equivalente a um array (possivelmente multidimensional) de n ponteiros de função para cada especialização de `std::visit`, o que é similar à implementação de [funções virtuais](<#/doc/language/virtual>).

As implementações também podem gerar uma [instrução switch](<#/doc/language/switch>) com n ramificações para `std::visit` (por exemplo, a implementação MSVC STL usa uma instrução switch quando n não é maior que 256).

Em implementações típicas, a complexidade de tempo da invocação de v pode ser considerada igual à do acesso a um elemento em um array (possivelmente multidimensional) ou à execução de uma instrução switch.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
[`__cpp_lib_variant`](<#/doc/feature_test>) | [`202102L`](<#/>) | (C++23)
(DR17) | `std::visit` para classes derivadas de [std::variant](<#/doc/utility/variant>)

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <type_traits>
    #include <variant>
    #include <vector>
    
    // a variant a ser visitada
    using value_t = std::variant<int, long, double, std::string>;
    
    // tipo auxiliar para o visitor #4
    template<class... Ts>
    struct overloaded : Ts... { using Ts::operator()...; };
    // guia de dedução explícita (não necessário a partir de C++20)
    template<class... Ts>
    overloaded(Ts...) -> overloaded<Ts...>;
    
    int main()
    {
        std::vector<value_t> vec = {10, 15l, 1.5, "hello"};
    
        for (auto& v: vec)
        {
            // 1. visitor void, chamado apenas para efeitos colaterais (aqui, para E/S)
            std::visit({ std::cout << arg; }, v);
    
            // 2. visitor que retorna valor, demonstra o idioma de retornar outra variant
            value_t w = std::visit( -> value_t { return arg + arg; }, v);
    
            // 3. visitor de correspondência de tipo: uma lambda que lida com cada tipo de forma diferente
            std::cout << ". Após dobrar, a variant contém ";
            std::visit(
            {
                using T = std::decay_t<decltype(arg)>;
                if constexpr (std::is_same_v<T, int>)
                    std::cout << "int com valor " << arg << '\n';
                else if constexpr (std::is_same_v<T, long>)
                    std::cout << "long com valor " << arg << '\n';
                else if constexpr (std::is_same_v<T, double>)
                    std::cout << "double com valor " << arg << '\n';
                else if constexpr (std::is_same_v<T, std::string>)
                    std::cout << "std::string com valor " << std::quoted(arg) << '\n';
                else
                    static_assert(false, "visitor não exaustivo!");
            }, w);
        }
    
        for (auto& v: vec)
        {
            // 4. outro visitor de correspondência de tipo: uma classe com 3 operator()'s sobrecarregados
            // Nota: O `(auto arg)` template operator() se ligará a `int` e `long`
            //       neste caso, mas na sua ausência o `(double arg)` operator()
            //       *também* se ligará a `int` e `long` porque ambos são implicitamente
            //       conversíveis para double. Ao usar esta forma, deve-se ter cuidado
            //       para que as conversões implícitas sejam tratadas corretamente.
            std::visit(overloaded{
                 { std::cout << arg << ' '; },
                 { std::cout << std::fixed << arg << ' '; },
                & arg) { std::cout << std::quoted(arg) << ' '; }
            }, v);
        }
    }
```

Output:
```
    10. Após dobrar, a variant contém int com valor 20
    15. Após dobrar, a variant contém long com valor 30
    1.5. Após dobrar, a variant contém double com valor 3
    hello. Após dobrar, a variant contém std::string com valor "hellohello"
    10 15 1.500000 "hello"
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2970](<https://cplusplus.github.io/LWG/issue2970>) | C++17 | o tipo de retorno da sobrecarga (1) não preservava a
categoria de valor do resultado da operação `_INVOKE_` | preserva
[LWG 3052](<https://cplusplus.github.io/LWG/issue3052>)
([P2162R2](<https://wg21.link/P2162R2>)) | C++17 | os efeitos eram não especificados se qualquer tipo
em `Variants` não fosse um [std::variant](<#/doc/utility/variant>) | especificado

### Veja também

[ visit](<#/doc/utility/variant/visit>)(C++26) | chama o functor fornecido com o argumento contido pela `variant`
(função membro pública)
[ swap](<#/doc/utility/variant/swap>) | troca com outra `variant`
(função membro pública)