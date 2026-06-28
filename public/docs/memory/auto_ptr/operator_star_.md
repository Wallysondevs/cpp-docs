# std::auto_ptr&lt;T&gt;::operator*, std::auto_ptr&lt;T&gt;::operator-&gt;

T& operator*() const throw(); |  (1)  |  (obsoleto desde C++11)   
(removido em C++17)  
T* operator->() const throw(); |  (2)  |  (obsoleto desde C++11)   
(removido em C++17)  

  
Desreferencia um ponteiro para o objeto gerenciado. A primeira versão requer get() != 0.

### Parâmetros

(nenhum)

### Valor de retorno

1) *get().

2) get().

### Veja também

[ get](<#/doc/memory/auto_ptr/get>) | retorna um ponteiro para o objeto gerenciado   
(função membro pública)  