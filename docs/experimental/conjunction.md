# std::experimental::conjunction

Definido no cabeçalho `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)") | |`

```c
template< class... B >
struct conjunction;
```

Forma a [conjunção lógica](<https://en.wikipedia.org/wiki/Logical_conjunction>) dos type traits `B...`, realizando efetivamente um AND lógico na sequência de traits.

A especialização std::experimental::conjunction<B1, ..., BN> possui uma base pública e não ambígua que é

*   se sizeof...(B) == 0, [std::true_type](<#/doc/types/integral_constant>); caso contrário
*   o primeiro tipo `Bi` em `B1, ..., BN` para o qual bool(Bi::value) == false, ou `BN` se não houver tal tipo.

Os nomes dos membros da classe base, exceto `conjunction` e `operator=`, não são ocultados e estão inequivocamente disponíveis em `conjunction`.

Conjunction é de curto-circuito: se houver um argumento de tipo de template `Bi` com bool(Bi::value) == false, então instanciar conjunction<B1, ..., BN>::value não requer a instanciação de Bj::value para j > i.

### Parâmetros de template

- **B...** — cada argumento de template `Bi` para o qual Bi::value é instanciado deve ser utilizável como uma classe base e definir o membro `value` que seja conversível para bool

### Template de variável auxiliar

template< class... B >
constexpr bool conjunction_v = conjunction<B...>::value; | | (library fundamentals TS v2)

### Possível implementação
```cpp
    template<class...> struct conjunction : std::true_type {};
    template<class B1> struct conjunction<B1> : B1 {};
    template<class B1, class... Bn>
    struct conjunction<B1, Bn...> 
        : std::conditional_t<bool(B1::value), conjunction<Bn...>, B1> {};
```

---

### Observações

Uma especialização de `conjunction` não herda necessariamente de [std::true_type](<#/doc/types/integral_constant>) nem de [std::false_type](<#/doc/types/integral_constant>): ela simplesmente herda do primeiro B cujo ::value, convertido para bool, é falso, ou do último B quando todos eles convertem para verdadeiro. Por exemplo, conjunction<[std::integral_constant](<#/doc/types/integral_constant>)<int, 2>, [std::integral_constant](<#/doc/types/integral_constant>)<int, 4>>::value é 4.

### Exemplo

Execute este código
```cpp
    #include <experimental/type_traits>
    #include <iostream>
    
    // func is enabled if all Ts... have the same type
    template<typename T, typename... Ts>
    constexpr std::enable_if_t<std::experimental::conjunction_v<std::is_same<T, Ts>...>>
    func(T, Ts...)
    {
        std::cout << "All types are the same.\n";
    }
    
    template<typename T, typename... Ts>
    constexpr std::enable_if_t<!std::experimental::conjunction_v<std::is_same<T, Ts>...>>
    func(T, Ts...)
    {
        std::cout << "Types differ.\n";
    }
    
    int main()
    {
        func(1, 2'7, 3'1);    
        func(1, 2.7, '3');    
    }
```

Saída:
```
    All types are the same.
    Types differ.
```

### Veja também

[ conjunction](<#/doc/types/conjunction>)(C++17) | metafunção AND lógico variádica
(class template)