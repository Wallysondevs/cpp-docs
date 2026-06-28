# std::experimental::disjunction

Definido no cabeçalho `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`

```c
template< class... B >
struct disjunction;
```

Forma a [disjunção lógica](<https://en.wikipedia.org/wiki/Logical_disjunction>) dos type traits `B...`, efetivamente realizando um "ou" lógico na sequência de traits.

A especialização std::experimental::disjunction<B1, ..., BN> possui uma base pública e não ambígua que é

*   se sizeof...(B) == 0, [std::false_type](<#/doc/types/integral_constant>); caso contrário
*   o primeiro tipo `Bi` em `B1, ..., BN` para o qual bool(Bi::value) == true, ou `BN` se não houver tal tipo.

Os nomes dos membros da classe base, exceto `disjunction` e `operator=`, não são ocultados e estão inequivocamente disponíveis em `disjunction`.

A disjunção é de curto-circuito: se houver um argumento de tipo template `Bi` com bool(Bi::value) != false, então a instanciação de disjunction<B1, ..., BN>::value não requer a instanciação de Bj::value para `j > i`.

### Parâmetros de template

- **B...** — cada argumento de template `Bi` para o qual Bi::value é instanciado deve ser utilizável como uma classe base e definir o membro `value` que seja conversível para bool

### Template de variável auxiliar

template< class... B >
constexpr bool disjunction_v = disjunction<B...>::value; | | (library fundamentals TS v2)

### Implementação possível
```cpp
    template<class...> struct disjunction : std::false_type {};
    template<class B1> struct disjunction<B1> : B1 {};
    template<class B1, class... Bn>
    struct disjunction<B1, Bn...> 
        : std::conditional_t<bool(B1::value), B1, disjunction<Bn...>>  {};
```

---

### Observações

Uma especialização de `disjunction` não herda necessariamente de [std::true_type](<#/doc/types/integral_constant>) ou [std::false_type](<#/doc/types/integral_constant>): ela simplesmente herda do primeiro `B` cujo `::value`, explicitamente convertido para `bool`, é verdadeiro, ou do último `B` quando todos eles convertem para falso. Por exemplo, disjunction<[std::integral_constant](<#/doc/types/integral_constant>)<int, 2>, [std::integral_constant](<#/doc/types/integral_constant>)<int, 4>>::value é 2.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ disjunction](<#/doc/types/disjunction>)(C++17) | metafunção OR lógica variádica
(class template)