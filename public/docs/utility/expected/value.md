# std::expected&lt;T,E&gt;::value

```cpp
Modelo primário
constexpr T& value() &;  // (1) (desde C++23)
constexpr const T& value() const&;  // (2) (desde C++23)
constexpr T&& value() &&;  // (3) (desde C++23)
constexpr const T&& value() const&&;  // (4) (desde C++23)
especialização parcial void
constexpr void value() const&;  // (5) (desde C++23)
constexpr void value() &&;  // (6) (desde C++23)
```

  
Se *this contiver um valor esperado, retorna uma referência para o valor contido. Não retorna nada para a especialização parcial void.

Caso contrário, lança uma exceção do tipo [std::bad_expected_access](<#/doc/utility/expected/bad_expected_access>)<[std::decay_t](<#/doc/types/decay>)&lt;E&gt;> que contém uma cópia de [`error()`](<#/doc/utility/expected/error>).

1,2) Se [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;E&gt; for false, o programa é malformado.

3,4) Se [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;E&gt; ou [std::is_constructible_v](<#/doc/types/is_constructible>)<E, decltype(std::move(error()))> for false, o programa é malformado.

5) Se [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;E&gt; for false, o programa é malformado.

6) Se [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt; for false, o programa é malformado.

### Valor de retorno

1,2) [`_val_`](<#/doc/utility/expected>)

3,4) std::move(`_val_`)

### Exceções

1,2,5) Lança [std::bad_expected_access](<#/doc/utility/expected/bad_expected_access>)([std::as_const](<#/doc/utility/as_const>)(error())) se *this contiver um valor inesperado.

3,4,6) Lança [std::bad_expected_access](<#/doc/utility/expected/bad_expected_access>)(std::move(error())) se *this contiver um valor inesperado.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3940](<https://cplusplus.github.io/LWG/issue3940>) | C++23  | `E` não era exigido ser copy/move-constructible para as sobrecargas (5,6) | exigido   
  
### Veja também

[ value_or](<#/doc/utility/expected/value_or>) | retorna o valor esperado se presente, outro valor caso contrário   
(função membro pública)  
[ operator->operator*](<#/doc/utility/expected/operator_star_>) | acessa o valor esperado   
(função membro pública)  
[ error](<#/doc/utility/expected/error>) | retorna o valor inesperado   
(função membro pública)  
[ bad_expected_access](<#/doc/utility/expected/bad_expected_access>)(C++23) | exceção indicando acesso verificado a um `expected` que contém um valor inesperado   
(modelo de classe)