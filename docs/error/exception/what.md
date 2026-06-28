# std::exception::what

```cpp
virtual const char* what() const throw();  // (até C++11)
virtual const char* what() const noexcept;  // (desde C++11)
(constexpr desde C++26)
```

  
Retorna a string explicativa. 

### Parâmetros

(nenhum) 

### Valor de retorno

Ponteiro para uma string terminada em nulo com informações explicativas. O ponteiro tem garantia de ser válido pelo menos até que o objeto de exceção do qual ele é obtido seja destruído, ou até que uma função membro não-const do objeto de exceção seja chamada. 

A string retornada é codificada com a codificação literal ordinária durante a avaliação constante.  | (desde C++26)  
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 108](<https://cplusplus.github.io/LWG/issue108>) | C++98  | não era especificado quando o ponteiro retornado se tornava inválido  | especificado 