# std::inout_ptr_t&lt;Smart,Pointer,Args...&gt;::~inout_ptr_t

```cpp
~inout_ptr_t();  // (desde C++23)
```

  
Redefine o objeto `Smart` adaptado pelo valor do objeto `Pointer` modificado (ou o objeto void* se o operador void**() tiver sido chamado) e os argumentos capturados. `release()` pode ser chamado no objeto `Smart` adaptado se não for chamado pelo construtor.

Considere:

  * `s` denota o objeto `Smart` adaptado,
  * `args...` denota os argumentos capturados,
  * `p` denota o valor do `Pointer` armazenado, ou `static_cast<Pointer>(*operator void**())` se o operador `void` tiver sido chamado,
  * `SP` seja
    * `Smart::pointer`, se for válido e denotar um tipo, caso contrário,
    * `Smart::element_type*`, se `Smart::element_type` for válido e denotar um tipo, caso contrário,
    * `[std::pointer_traits](<#/doc/memory/pointer_traits>)<Smart>::element_type*`, se `[std::pointer_traits](<#/doc/memory/pointer_traits>)<Smart>::element_type` for válido e denotar um tipo, caso contrário,
    * `Pointer`,
  * `/*do-release*/` denota `s.release()` se o [construtor](<#/doc/memory/inout_ptr_t/inout_ptr_t>) não chamar `release()`, vazio caso contrário.

Se `Smart` for um tipo ponteiro, o destrutor executa

    s = static_cast<Smart>(p);, e o programa é malformado se sizeof...(Args) > 0;

caso contrário, se `s.reset(static_cast<SP>(p), [std::forward](<#/doc/utility/forward>)<Args>(args)...)` for bem-formado, o destrutor executa

    /*do-release*/; if (p) { s.reset(static_cast<SP>(p), [std::forward](<#/doc/utility/forward>)<Args>(args)...); };

caso contrário, se `[std::is_constructible_v](<#/doc/types/is_constructible>)<Smart, SP, Args...>` for verdadeiro, o destrutor executa

    /*do-release*/; if (p) { s = Smart(static_cast<SP>(p), [std::forward](<#/doc/utility/forward>)<Args>(args)...); };

caso contrário, o programa é malformado.

### Notas

A implementação pode alocar o armazenamento para a estrutura de dados necessária para `Smart` (por exemplo, um bloco de controle) na construção, a fim de deixar trabalhos que não lançam exceções para o destrutor.

Argumentos capturados por valor são destruídos após a redefinição.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3897](<https://cplusplus.github.io/LWG/issue3897>) | C++23  | o destrutor não atualizava um ponteiro bruto para o valor nulo  | ele o faz 