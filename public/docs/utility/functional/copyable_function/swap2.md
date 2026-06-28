# swap(std::copyable_function)

```cpp
friend void swap( std::copyable_function& lhs, std::copyable_function& rhs ) noexcept;  // (desde C++26)
```

Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para std::copyable_function. Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs).

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::copyable_function<FunctionType>` é uma classe associada dos argumentos.

### Parâmetros

- **lhs, rhs** — objetos `std::copyable_function` cujos estados devem ser trocados

### Valor de retorno

(nenhum)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ swap](<#/doc/utility/functional/copyable_function/swap>) | troca os alvos de dois objetos `std::copyable_function`
(função membro pública)
[ std::swap(std::function)](<#/doc/utility/functional/function/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ swap(std::move_only_function)](<#/doc/utility/functional/move_only_function/swap2>)(C++23) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(função)