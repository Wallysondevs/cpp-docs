# std::unique_lock&lt;Mutex&gt;::operator=

```cpp
unique_lock& operator=( unique_lock&& other );  // (desde C++11)
```

  
Operador de atribuição por movimento. Substitui o conteúdo com o de other usando move semantics.

Se antes da chamada *this tiver um mutex associado e tiver adquirido a sua posse, o mutex é desbloqueado.

### Parâmetros

other  |  \-  |  outro `unique_lock` para substituir o estado   
  
### Valor de retorno

*this

### Exceções

Não lança exceções.

### Observações

Com um mutex recursivo, é possível que tanto *this quanto other possuam o mesmo mutex antes da atribuição. Neste caso, *this possuirá o mutex após a atribuição e other não.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2104](<https://cplusplus.github.io/LWG/issue2104>) | C++11  | o operador de atribuição por movimento era noexcept, mas pode lançar uma exceção no caso de comportamento indefinido[1](<#/>) | não é noexcept  
  
  1. [↑](<#/>) Por exemplo, *this é construído com [std::adopt_lock](<#/doc/thread/lock_tag_t>), mas a thread chamadora não possui a posse do mutex associado. Neste caso, *this não pode liberar corretamente a posse do mutex associado, e isso pode resultar no lançamento de uma exceção.
