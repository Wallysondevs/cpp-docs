# std::shared_future&lt;T&gt;::get

Modelo principal
const T& get() const; |  (1)  |  (desde C++11)  
Especializações de [std::shared_future](<#/doc/thread/shared_future>)<T&>
T& get() const; |  (2)  |  (desde C++11)  
Especialização de [std::shared_future](<#/doc/thread/shared_future>)&lt;void&gt;
void get() const; |  (3)  |  (desde C++11)  

  
A função membro `get` espera (chamando [wait()](<#/doc/thread/shared_future/wait>)) até que o estado compartilhado esteja pronto, então recupera o valor armazenado no estado compartilhado (se houver).

Se [valid()](<#/doc/thread/shared_future/valid>) for `false` antes da chamada a esta função, o comportamento é indefinido.

### Valor de retorno

1) Uma referência `const` ao valor armazenado no estado compartilhado. O comportamento de acessar o valor através desta referência após o estado compartilhado ter sido destruído é indefinido.

2) A referência armazenada como valor no estado compartilhado.

3) (nenhum)

### Exceções

Se uma exceção foi armazenada no estado compartilhado referenciado pelo future (por exemplo, através de uma chamada a [`std::promise::set_exception()`](<#/doc/thread/promise/set_exception>)), então essa exceção será lançada.

### Notas

O padrão C++ recomenda que as implementações detectem o caso em que [valid()](<#/doc/thread/shared_future/valid>) é `false` antes da chamada e lancem uma [std::future_error](<#/doc/thread/future_error>) com uma condição de erro de [std::future_errc::no_state](<#/doc/thread/future_errc>).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ valid](<#/doc/thread/shared_future/valid>) |  verifica se o future possui um estado compartilhado   
(função membro pública)  