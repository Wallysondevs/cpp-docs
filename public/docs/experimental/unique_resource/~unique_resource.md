# std::experimental::unique_resource&lt;R, D&gt;::~unique_resource

~unique_resource(); |  |  (library fundamentals TS v3)  

  
Descarta o recurso chamando o deleter com o handle do recurso subjacente se o `unique_resource` o possuir, equivalente a chamar reset(). Em seguida, destrói o handle do recurso armazenado e o deleter. 

### Veja também

[ reset](<#/doc/experimental/unique_resource/reset>) |  descarta ou substitui o recurso gerenciado   
(função membro pública)  
[ (destructor)](<#/doc/memory/unique_ptr/~unique_ptr>) |  destrói o objeto gerenciado se tal estiver presente   
(função membro pública de `std::unique_ptr<T,Deleter>`)