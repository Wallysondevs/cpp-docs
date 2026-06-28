# std::inout_ptr_t&lt;Smart,Pointer,Args...&gt;::operator Pointer*, std::inout_ptr_t&lt;Smart,Pointer,Args...&gt;::operator void**

```cpp
operator Pointer*() const noexcept;  // (1) (desde C++23)
operator void**() const noexcept;  // (2) (desde C++23)
```

  
Expõe o endereço de um objeto `Pointer` ou `void*` para uma função externa que geralmente liberará a propriedade representada por seu valor e então o reinicializará.

1) Converte `*this` para o endereço do objeto `Pointer` armazenado.

2) Converte `*this` para o endereço de um objeto `void*`. Esta função de conversão participa da resolução de sobrecarga apenas se `Pointer` não for o mesmo que `void*`, e o programa é malformado se `Pointer` não for um tipo de ponteiro.
O valor inicial do objeto `void*` é igual ao valor do objeto `Pointer` armazenado convertido para `void*`, e qualquer modificação a ele afeta o valor `Pointer` usado no [destrutor](<#/doc/memory/inout_ptr_t/~inout_ptr_t>). Acessar o objeto `void*` fora do tempo de vida de `*this` tem comportamento indefinido.

Uma vez que uma dessas duas funções de conversão tenha sido chamada em um objeto `inout_ptr_t`, a outra não deve ser chamada nele, caso contrário, o comportamento é indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

1) O endereço do objeto `Pointer` armazenado.

2) O endereço do objeto `void*` que satisfaz os requisitos mencionados.

### Notas

Se o objeto apontado pelo valor de retorno não tiver sido reescrito, ele é igual ao valor mantido pelo objeto `Smart` adaptado antes da construção.

Em implementações comuns, a representação de objeto de todo `Pointer` que é um tipo de ponteiro é compatível com a de `void*`, e, portanto, essas implementações tipicamente armazenam o objeto `void*` dentro do armazenamento para o objeto `Pointer`, sem necessidade de armazenamento adicional:

  * Se a implementação habilita a análise de alias baseada em tipo (que se baseia na [regra de aliasing estrito](<#/doc/language/reinterpret_cast>)), um subobjeto membro [std::byte](<#/doc/types/byte>)[sizeof(void*)] devidamente alinhado pode ser usado, e ambas as funções de conversão retornam o endereço de objetos [criados implicitamente](<#/doc/language/objects>) dentro do array.
  * Caso contrário, um subobjeto membro `Pointer` pode ser usado para ambas as funções de conversão, e (2) pode retornar diretamente seu endereço [`reinterpret_cast`](<#/doc/language/reinterpret_cast>) para `void`.

Se `Pointer` é um tipo de ponteiro cuja representação de objeto é incompatível com a de `void*`, uma flag `bool` adicional pode ser necessária para registrar se (1) (ou (2)) foi chamado.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo