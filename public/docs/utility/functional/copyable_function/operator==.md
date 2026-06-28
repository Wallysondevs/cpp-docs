# operator==(std::copyable_function)

```cpp
friend bool operator==( const std::copyable_function& f, std::nullptr_t ) noexcept;  // (desde C++26)
```

Verifica se o wrapper f possui um alvo chamável comparando-o formalmente com [std::nullptr_t](<#/doc/types/nullptr_t>). Wrappers vazios (isto é, wrappers sem um alvo) comparam como iguais, funções não vazias comparam como diferentes.

Esta função não é visível para lookup não qualificado comum ou lookup qualificado, e só pode ser encontrada por argument-dependent lookup quando `std::copyable_function<FunctionType>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

- **f** — `std::copyable_function` para comparar

### Valor de retorno

!f.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ operator bool](<#/doc/utility/functional/copyable_function/operator_bool>) | verifica se a `std::copyable_function` possui um alvo
(função membro pública)
[ operator==operator!=](<#/doc/utility/functional/function/operator_cmp>)(removido em C++20) | compara uma [std::function](<#/doc/utility/functional/function>) com nullptr
(modelo de função)
[ operator==](<#/>)(C++23) | compara uma `std::move_only_function` com nullptr
(função)