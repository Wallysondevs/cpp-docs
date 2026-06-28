# operator==,&lt;=&gt;(std::flat_multimap)

```cpp
friend bool operator==( const std::flat_multimap& lhs,
const std::flat_multimap& rhs );  // (1) (desde C++23)
friend synth-three-way-result<value_type>
operator<=>( const std::flat_multimap& lhs,
const std::flat_multimap& rhs );  // (2) (desde C++23)
```

Compara o conteúdo dos containers subjacentes de dois adaptadores de container. A comparação é feita aplicando o operador correspondente aos containers subjacentes. | Esta seção está incompleta  
Razão: Apenas para containers "flat": copiar partes de [Template:cpp/container/operator_cmp](<https://en.cppreference.com/w/Template:cpp/container/operator_cmp> "Template:cpp/container/operator cmp")  
  
### Parâmetros

lhs, rhs  |  \-  |  adaptadores de container cujo conteúdo comparar | | Esta seção está incompleta  
Razão: Adicionar requisitos nomeados aos tipos internos de containers "flat"   
  
### Valor de retorno

1) true se a comparação correspondente resultar em true, false caso contrário.

2) Resultado da comparação three-way nos containers subjacentes.

### Complexidade

1) Constante se lhs e rhs tiverem tamanhos diferentes, caso contrário, linear no tamanho do `flat_multimap`.

2) Linear no tamanho do container.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   