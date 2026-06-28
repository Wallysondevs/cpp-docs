# std::optional&lt;T&gt;::operator-&gt;, std::optional&lt;T&gt;::operator*

```cpp
constexpr const T* operator->() const noexcept;  // (1) (desde C++17)
constexpr T* operator->() noexcept;  // (1) (desde C++17)
constexpr const T& operator*() const& noexcept;  // (2) (desde C++17)
constexpr T& operator*() & noexcept;  // (2) (desde C++17)
constexpr const T&& operator*() const&& noexcept;  // (2) (desde C++17)
constexpr T&& operator*() && noexcept;  // (2) (desde C++17)
```

  
Acessa o valor contido.

1) Retorna um ponteiro para o valor contido.

2) Retorna uma referência para o valor contido.

O comportamento é indefinido se *this não contiver um valor.

### Parâmetros

(nenhum)

### Valor de retorno

Ponteiro ou referência para o valor contido.

### Observações

Este operador não verifica se o optional contém um valor! Você pode fazer isso manualmente usando [has_value()](<#/doc/utility/optional/operator_bool>) ou simplesmente [operator bool()](<#/doc/utility/optional/operator_bool>). Alternativamente, se for necessário acesso verificado, [value()](<#/doc/utility/optional/value>) ou [value_or()](<#/doc/utility/optional/value_or>) podem ser usados.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <optional>
    #include <string>
     
    int main()
    {
        using namespace std::string_literals;
     
        std::optional<int> opt1 = 1;
        std::cout << "opt1: " << *opt1 << '\n';
     
        *opt1 = 2;
        std::cout << "opt1: " << *opt1 << '\n';
     
        std::optional<std::string> opt2 = "abc"s;
        std::cout << "opt2: " << std::quoted(*opt2) << ", size: " << opt2->size() << '\n';
     
        // Você pode "pegar" o valor contido chamando operator* em um rvalue para optional
     
        auto taken = *std::move(opt2);
        std::cout << "taken: " << std::quoted(taken) << "\n"
                     "opt2: " << std::quoted(*opt2) << ", size: " << opt2->size()  << '\n';
    }
```

Saída: 
```
    opt1: 1
    opt1: 2
    opt2: "abc", size: 3
    taken: "abc"
    opt2: "", size: 0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2762](<https://cplusplus.github.io/LWG/issue2762>) | C++17  | `operator->` e `operator*` poderiam ser potencialmente-throwing  | tornado noexcept   
  
### Veja também

[ value](<#/doc/utility/optional/value>) |  retorna o valor contido   
(função membro pública)  
[ value_or](<#/doc/utility/optional/value_or>) |  retorna o valor contido se disponível, outro valor caso contrário   
(função membro pública)