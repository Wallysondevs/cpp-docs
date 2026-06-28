# std::uses_allocator&lt;std::function&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class R, class... ArgTypes, class Alloc >
struct uses_allocator<std::function<R(ArgTypes...)>, Alloc> : std::true_type { };
(até C++17)
```

  
Esta especialização de [std::uses_allocator](<#/doc/memory/uses_allocator>) informa outros componentes da biblioteca que todos os objetos do tipo [std::function](<#/doc/utility/functional/function>) suportam _construção com alocador_ (uses-allocator construction), mesmo que não possuam um `allocator_type` aninhado.

### Notas

O suporte a alocadores de `std::function` foi mal especificado e implementado de forma inconsistente. Algumas implementações não suportam a construção com alocador (uses-allocator construction) de forma alguma, algumas fornecem as sobrecargas de construtor necessárias, mas ignoram o argumento do alocador fornecido, e algumas fornecem as sobrecargas e usam o alocador fornecido para a construção, mas não quando o `std::function` é reatribuído. Como resultado, o suporte a alocadores foi removido no C++17.

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] |  true   
(constante membro estática pública)  
  
### Funções membro

operator bool |  converte o objeto para bool, retorna value   
(função membro pública)  
operator()(C++14) |  retorna value   
(função membro pública)  
  
### Tipos membro

Tipo  |  Definição   
---|---
`value_type` |  bool  
`type` |  [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>  
  
### Veja também

[ uses_allocator](<#/doc/memory/uses_allocator>)(desde C++11) |  verifica se o tipo especificado suporta construção com alocador (uses-allocator construction)   
(modelo de classe)  