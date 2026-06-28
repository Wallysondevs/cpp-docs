# std::conjunction

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class... B >
struct conjunction;
```

Forma a [conjunção lógica](<https://en.wikipedia.org/wiki/logical_conjunction> "enwiki:logical conjunction") dos type traits B..., realizando efetivamente um AND lógico na sequência de traits.

A especialização std::conjunction<B1, ..., BN> possui uma base pública e não ambígua que é

*   se sizeof...(B) == 0, [std::true_type](<#/doc/types/integral_constant>); caso contrário
*   o primeiro tipo `Bi` em `B1, ..., BN` para o qual bool(Bi::value) == false, ou `BN` se não houver tal tipo.

Os nomes dos membros da classe base, exceto `conjunction` e `operator=`, não são ocultados e estão não ambiguamente disponíveis em `conjunction`.

A conjunção é de curto-circuito: se houver um argumento de tipo de template `Bi` com bool(Bi::value) == false, então instanciar conjunction<B1, ..., BN>::value não requer a instanciação de Bj::value para `j > i`.

Se o programa adicionar especializações para `std::conjunction` ou `std::conjunction_v`, o comportamento é indefinido.

### Parâmetros de template

- **B...** — cada argumento de template `Bi` para o qual Bi::value é instanciado deve ser utilizável como uma classe base e definir o membro `value` que seja conversível para bool

### Template de variável auxiliar

```cpp
template< class... B >
constexpr bool conjunction_v = conjunction<B...>::value;  // (desde C++17)
```

### Possível implementação
```cpp
    template<class...>
    struct conjunction : std::true_type {};
    
    template<class B1>
    struct conjunction<B1> : B1 {};
    
    template<class B1, class... Bn>
    struct conjunction<B1, Bn...>
        : std::conditional_t<bool(B1::value), conjunction<Bn...>, B1> {};
```

---

### Notas

Uma especialização de `conjunction` não herda necessariamente de [std::true_type](<#/doc/types/integral_constant>) ou [std::false_type](<#/doc/types/integral_constant>): ela simplesmente herda do primeiro `B` cujo `::value`, explicitamente convertido para bool, é falso, ou do último `B` quando todos eles convertem para true. Por exemplo, std::conjunction<[std::integral_constant](<#/doc/types/integral_constant>)<int, 2>, [std::integral_constant](<#/doc/types/integral_constant>)<int, 4>>::value é 4.

A instanciação de curto-circuito diferencia `conjunction` de [expressões de fold](<#/doc/language/fold>): uma expressão de fold, como (... && Bs::value), instancia cada `B` em `Bs`, enquanto std::conjunction_v<Bs...> para a instanciação assim que o valor pode ser determinado. Isso é particularmente útil se o tipo posterior for caro para instanciar ou puder causar um erro grave quando instanciado com o tipo errado.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_logical_traits`](<#/doc/feature_test>) | [`201510L`](<#/>) | (C++17) | [Traits de tipo de operador lógico](<#/doc/meta>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    
    // func é habilitada se todos os Ts... tiverem o mesmo tipo que T
    template<typename T, typename... Ts>
    std::enable_if_t<std::conjunction_v<std::is_same<T, Ts>...>>
    func(T, Ts...)
    {
        std::cout << "Todos os tipos no pacote são os mesmos.\n";
    }
    
    // caso contrário
    template<typename T, typename... Ts>
    std::enable_if_t<!std::conjunction_v<std::is_same<T, Ts>...>>
    func(T, Ts...)
    {
        std::cout << "Nem todos os tipos no pacote são os mesmos.\n";
    }
    
    template<typename T, typename... Ts>
    constexpr bool all_types_are_same = std::conjunction_v<std::is_same<T, Ts>...>;
    
    static_assert(all_types_are_same<int, int, int>);
    static_assert(not all_types_are_same<int, int&, int>);
    
    int main()
    {
        func(1, 2, 3);
        func(1, 2, "hello!");
    }
```

Saída:
```
    Todos os tipos no pacote são os mesmos.
    Nem todos os tipos no pacote são os mesmos.
```

### Veja também

[ negation](<#/doc/types/negation>)(C++17) | metafunção NOT lógica
(template de classe)
[ disjunction](<#/doc/types/disjunction>)(C++17) | metafunção OR lógica variádica
(template de classe)