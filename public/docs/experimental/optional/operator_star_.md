# std::experimental::optional&lt;T&gt;::operator-&gt;, std::experimental::optional&lt;T&gt;::operator*

constexpr const T* operator->() const; | (1) | (library fundamentals TS)
---|---|---
constexpr T* operator->(); | (1) | (library fundamentals TS)
constexpr const T& operator*() const&; | (2) | (library fundamentals TS)
constexpr T& operator*() &; | (2) | (library fundamentals TS)
constexpr const T&& operator*() const&&; | (2) | (library fundamentals TS)
constexpr T&& operator*() &&; | (2) | (library fundamentals TS)

Acessa o valor contido.

1) Retorna um ponteiro para o valor contido.

2) Retorna uma referência para o valor contido.

O comportamento é indefinido se *this _não contiver um valor_.

### Parâmetros

(nenhum)

### Valor de retorno

Ponteiro ou referência para o valor contido.

### Exceções

Não lança exceções.

### Observações

Este operador não verifica se o optional contém um valor. Se for necessário acesso verificado, [value()](<#/doc/experimental/optional/value>) ou [value_or()](<#/doc/experimental/optional/value_or>) podem ser usados.

### Exemplo

Execute este código
```
    #include <experimental/optional>
    #include <iostream>
    #include <string>
    using namespace std::literals;
    
    int main()
    {
        std::experimental::optional<int> opt1 = 1;
        std::cout << *opt1 << '\n';
    
        std::experimental::optional<std::string> opt2 = "abc"s;
        std::cout << opt2->size() << '\n';
    }
```

Saída:
```
    1
    3
```

### Veja também

[ value](<#/doc/experimental/optional/value>) | retorna o valor contido
(função membro pública)
[ value_or](<#/doc/experimental/optional/value_or>) | retorna o valor contido se disponível, outro valor caso contrário
(função membro pública)