# std::out_ptr_t&lt;Smart,Pointer,Args...&gt;::~out_ptr_t

```cpp
~out_ptr_t();  // (desde C++23)
```

  
Reinicia o objeto `Smart` adaptado pelo valor do objeto `Pointer` modificado (ou o objeto void* se operator void**() tiver sido chamado) e os argumentos capturados. 

Seja 

  * `s` denota o objeto `Smart` adaptado, 
  * `args...` denota os argumentos capturados, 
  * `p` denota o valor do `Pointer` armazenado, ou static_cast&lt;Pointer&gt;(*operator void**()) se operator void** tiver sido chamado, 
  * `SP` for 
    * Smart::pointer, se for válido e denotar um tipo, caso contrário, 
    * Smart::element_type*, se Smart::element_type for válido e denotar um tipo, caso contrário, 
    * [std::pointer_traits](<#/doc/memory/pointer_traits>)<Smart>::element_type*, se [std::pointer_traits](<#/doc/memory/pointer_traits>)<Smart>::element_type for válido e denotar um tipo, caso contrário, 
    * `Pointer`. 

Se s.reset(static_cast&lt;SP&gt;(p), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...) for bem-formado, o destrutor executa 

    if (p) s.reset(static_cast<SP>(p), [std::forward](<#/doc/utility/forward>)<Args>(args)...);, 

caso contrário, se [std::is_constructible_v](<#/doc/types/is_constructible>)<Smart, SP, Args...> for verdadeiro, o destrutor executa 

    if (p) s = Smart(static_cast<SP>(p), [std::forward](<#/doc/utility/forward>)<Args>(args)...);, 

caso contrário, o programa é malformado. 

### Notas

Se `Smart` for uma especialização de [std::shared_ptr](<#/doc/memory/shared_ptr>), a implementação pode alocar o armazenamento para o novo bloco de controle na construção, a fim de deixar trabalhos que não lançam exceções para o destrutor. 

Argumentos capturados por valor são destruídos após o reinício. 