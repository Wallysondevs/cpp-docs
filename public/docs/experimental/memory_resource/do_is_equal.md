# std::experimental::pmr::memory_resource::do_is_equal

virtual bool is_equal( const memory_resource& other ) const noexcept = 0; |  |  (library fundamentals TS)  

  
Compara *this por igualdade com other.

Duas `memory_resource`s se comparam como iguais se e somente se a memória alocada de uma `memory_resource` puder ser desalocada da outra e vice-versa.

### Observações

O tipo mais derivado de other pode não corresponder ao tipo mais derivado de *this. Uma implementação de classe derivada, portanto, deve tipicamente verificar se os tipos mais derivados de *this e other correspondem usando `dynamic_cast`, e retornar `false` imediatamente se a conversão falhar.

### Veja também

[ is_equal](<#/doc/experimental/memory_resource/is_equal>) | compara por igualdade com outra `memory_resource`   
(função membro pública)  