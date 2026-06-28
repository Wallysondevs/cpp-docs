# std::experimental::future&lt;T&gt;::future

```cpp
future() noexcept;  // (1)
future( std::experimental::future<T>&& f ) noexcept;  // (2)
future( const std::experimental::future<T>& ) = delete;  // (3)
future( std::experimental::future<std::experimental::future<T>> && other ) noexcept;  // (4)
```

  
1) Construtor padrão. Constrói um objeto `future` vazio que não se refere a um estado compartilhado.

2) Constrói um objeto `future`, transferindo o estado compartilhado mantido por `f`, se houver. Após a construção, `f.valid()` é `false`.

3) O construtor de cópia é deletado. `future` não pode ser copiado.

4) Construtor de desembrulho. Constrói um objeto `future` a partir do estado compartilhado referido por `other`, se houver. Se `other.valid() == false` antes desta chamada, o objeto `future` construído é vazio. Caso contrário, o objeto `future` resultante fica pronto quando um dos seguintes ocorre: 

  * `other` e `other.get()` estão ambos prontos. O valor ou exceção de `other.get()` é armazenado no estado compartilhado associado ao objeto `future` resultante. 
  * `other` está pronto, mas `other.get()` é inválido. Uma exceção do tipo [std::future_error](<#/doc/thread/future_error>) com uma condição de erro de [std::future_errc::broken_promise](<#/doc/thread/future_errc>) é armazenada no estado compartilhado associado ao objeto `future` resultante.

Após este construtor retornar, `valid()` é igual ao valor de `other.valid()` antes desta chamada, e `other.valid() == false`.

  

### Parâmetros

f  |  \-  |  outro objeto `future` para inicializar com   
---|---|---
other  |  \-  |  um objeto `std::experimental::future` para desembrulhar   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 2697](<https://cplusplus.github.io/LWG/issue2697>) | Concurrency TS  | o comportamento do construtor de desembrulho é incerto com um `future` inválido | constrói um `future` vazio  
  
### Veja também

[ (constructor)](<#/doc/thread/future/future>) |  constrói o objeto `future`   
(função membro pública de `std::future<T>`)  