# std::variant

Definido no cabeçalho `[<variant>](<#/doc/header/variant>)`

```c
template< class... Types >
class variant;
```

O template de classe `std::variant` representa uma [union](<#/doc/language/union>) type-safe. Uma instância de `std::variant` a qualquer momento pode conter um valor de um de seus tipos alternativos, ou, em caso de erro, nenhum valor (este estado é difícil de alcançar, veja [`valueless_by_exception`](<#/doc/utility/variant/valueless_by_exception>)).

Assim como nas unions, se uma variant contém um valor de algum tipo de objeto `T`, o objeto `T` é [aninhado dentro](<#/doc/language/objects>) do próprio objeto `variant`. A variant não tem permissão para alocar memória adicional (dinâmica).

Não é permitido que uma variant contenha referências, arrays, ou o tipo void.

É permitido que uma variant contenha o mesmo tipo mais de uma vez, e que contenha versões do mesmo tipo com qualificadores cv diferentes.

Consistente com o comportamento das unions durante a [inicialização agregada](<#/doc/language/aggregate_initialization>), uma variant construída por padrão contém um valor de sua primeira alternativa, a menos que essa alternativa não seja default-constructible (nesse caso, a variant também não é default-constructible). A classe auxiliar [`std::monostate`](<#/doc/utility/variant/monostate>) pode ser usada para tornar tais variants default-constructible.

Um programa que instancia a definição de `std::variant` sem argumentos de template é malformado. `std::variant<[std::monostate](<#/doc/utility/variant/monostate>)>` pode ser usado em vez disso.

Se um programa declara uma especialização [explícita](<#/doc/language/template_specialization>) ou [parcial](<#/doc/language/partial_specialization>) de `std::variant`, o programa é malformado, sem diagnóstico requerido.

### Parâmetros de template

- **Types** — os tipos que podem ser armazenados nesta variant. Todos os tipos devem atender aos requisitos [Destructible](<#/doc/named_req/Destructible>) (em particular, tipos array e tipos não-objeto não são permitidos).

### Funções membro

[ (construtor)](<#/doc/utility/variant/variant>) | constrói o objeto `variant`
(função membro pública)
[ (destrutor)](<#/doc/utility/variant/~variant>) | destrói a `variant`, juntamente com seu valor contido
(função membro pública)
[ operator=](<#/>) | atribui uma `variant`
(função membro pública)

##### Observadores

[ index](<#/doc/utility/variant/index>) | retorna o índice baseado em zero da alternativa contida pela `variant`
(função membro pública)
[ valueless_by_exception](<#/doc/utility/variant/valueless_by_exception>) | verifica se a `variant` está em estado inválido
(função membro pública)

##### Modificadores

[ emplace](<#/doc/utility/variant/emplace>) | constrói um valor na `variant`, no local
(função membro pública)
[ swap](<#/doc/utility/variant/swap>) | troca com outra `variant`
(função membro pública)

##### Visitação

[ visit](<#/doc/utility/variant/visit>)(C++26) | chama o functor fornecido com o argumento contido pela `variant`
(função membro pública)

### Funções não-membro

[ visit](<#/doc/utility/variant/visit2>)(C++17) | chama o functor fornecido com os argumentos contidos por uma ou mais `variant`s
(template de função)
[ holds_alternative](<#/doc/utility/variant/holds_alternative>)(C++17) | verifica se uma `variant` atualmente contém um determinado tipo
(template de função)
[ get(std::variant)](<#/doc/utility/variant/get>)(C++17) | lê o valor da variant dado o índice ou o tipo (se o tipo for único), lança exceção em caso de erro
(template de função)
[ get_if](<#/doc/utility/variant/get_if>)(C++17) | obtém um ponteiro para o valor de uma `variant` apontada, dado o índice ou o tipo (se único), retorna nulo em caso de erro
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/variant/operator_cmp>)(C++17)(C++17)(C++17)(C++17)(C++17)(C++17)(C++20) | compara objetos `variant` pelos seus valores contidos
(template de função)
[ std::swap(std::variant)](<#/doc/utility/variant/swap2>)(C++17) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)

### Classes auxiliares

[ monostate](<#/doc/utility/variant/monostate>)(C++17) | tipo placeholder para uso como a primeira alternativa em uma `variant` de tipos não-default-constructible
(classe)
[ bad_variant_access](<#/doc/utility/variant/bad_variant_access>)(C++17) | exceção lançada em acessos inválidos ao valor de uma `variant`
(classe)
[ variant_sizevariant_size_v](<#/doc/utility/variant/variant_size>)(C++17) | obtém o tamanho da lista de alternativas da `variant` em tempo de compilação
(template de classe) (template de variável)
[ variant_alternativevariant_alternative_t](<#/doc/utility/variant/variant_alternative>)(C++17) | obtém o tipo da alternativa especificada por seu índice, em tempo de compilação
(template de classe) (template de alias)
[ std::hash<std::variant>](<#/doc/utility/variant/hash>)(C++17) | suporte a hash para `std::variant`
(especialização de template de classe)

### Objetos auxiliares

[ variant_npos](<#/doc/utility/variant/variant_npos>)(C++17) | índice da `variant` em estado inválido
(constante)

### Notas

```cpp
Macro de teste de recurso | Valor | Std | Recurso
`__cpp_lib_variant` | `201606L` | (C++17) | `std::variant`: uma union type-safe
`202102L`  // (C++23)
(DR17) | std::visit para classes derivadas de `std::variant`
`202106L`  // (C++23)
(DR20) | `std::variant` totalmente `constexpr`
`202306L` | (C++26) | Membro `visit`
```

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <string>
    #include <variant>
    
    int main()
    {
        std::variant<int, float> v, w;
        v = 42; // v contains int
        int i = std::get<int>(v);
        assert(42 == i); // succeeds
        w = std::get<int>(v);
        w = std::get<0>(v); // same effect as the previous line
        w = v; // same effect as the previous line
    
    //  std::get<double>(v); // error: no double in [int, float]
    //  std::get<3>(v);      // error: valid index values are 0 and 1
    
        try
        {
            std::get<float>(w); // w contains int, not float: will throw
        }
        catch (const std::bad_variant_access& ex)
        {
            std::cout << ex.what() << '\n';
        }
    
        using namespace std::literals;
    
        std::variant<std::string> x("abc");
        // converting constructors work when unambiguous
        x = "def"; // converting assignment also works when unambiguous
    
        std::variant<std::string, void const*> y("abc");
        // casts to void const* when passed a char const*
        assert(std::holds_alternative<void const*>(y)); // succeeds
        y = "xyz"s;
        assert(std::holds_alternative<std::string>(y)); // succeeds
    }
```

Saída possível:
```
    std::get: wrong index for variant
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2901](<https://cplusplus.github.io/LWG/issue2901>) | C++17 | especialização de [std::uses_allocator](<#/doc/memory/uses_allocator>) fornecida, mas `std::variant` não pode suportar alocadores adequadamente | especialização removida
[LWG 3990](<https://cplusplus.github.io/LWG/issue3990>) | C++17 | um programa poderia declarar uma especialização explícita ou parcial de `std::variant` | o programa é malformado neste caso (sem diagnóstico requerido)

### Veja também

[ in_placein_place_typein_place_indexin_place_tin_place_type_tin_place_index_t](<#/doc/utility/in_place>)(C++17) | tag de construção in-place
(tag)
[ optional](<#/doc/utility/optional>)(C++17) | um wrapper que pode ou não conter um objeto
(template de classe)
[ any](<#/doc/utility/any>)(C++17) | objetos que contêm instâncias de qualquer tipo [CopyConstructible](<#/doc/named_req/CopyConstructible>)
(classe)