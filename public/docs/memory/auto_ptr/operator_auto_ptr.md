# std::auto_ptr&lt;T&gt;::operator auto_ptr&lt;Y&gt;

template< class Y >  
operator auto_ptr_ref&lt;Y&gt;() throw(); |  (1)  |  (obsoleto desde C++11)   
(removido em C++17)  
template< class Y >  
operator auto_ptr&lt;Y&gt;() throw(); |  (2)  |  (obsoleto desde C++11)   
(removido em C++17)  

  
Converte *this para um `auto_ptr` de um tipo `Y` diferente.

1) Retorna um tipo definido pela implementação que mantém uma referência para *this. [std::auto_ptr](<#/doc/memory/auto_ptr>) é [convertível](<#/doc/memory/auto_ptr/auto_ptr>) e [atribuível](<#/>) a partir deste template. A implementação pode fornecer o template com um nome diferente ou implementar funcionalidade equivalente de outras maneiras.

2) Constrói um novo `auto_ptr` com um ponteiro obtido chamando [release()](<#/doc/memory/auto_ptr/release>).

### Parâmetros

(nenhum) 

### Valor de retorno

1) Um tipo definido pela implementação que mantém uma referência para *this.

2) Um `auto_ptr` com um ponteiro obtido chamando [release()](<#/doc/memory/auto_ptr/release>).

### Notas

O construtor e o operador de atribuição de cópia de `auto_ptr_ref` são fornecidos para permitir a construção por cópia e a atribuição de [std::auto_ptr](<#/doc/memory/auto_ptr>) a partir de temporários sem nome. Como seu construtor de cópia e operador de atribuição de cópia recebem o argumento como referência não-const, eles não podem vincular argumentos rvalue diretamente. No entanto, uma conversão definida pelo usuário (1) ou (2) pode ser executada (o que libera o `auto_ptr` original), seguida por uma chamada ao construtor ou operador de atribuição de cópia que recebe `auto_ptr_ref` por valor. Esta é uma implementação inicial de [move semantics](<#/doc/utility/move>). 