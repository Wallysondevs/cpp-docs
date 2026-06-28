# std::common_type&lt;std::chrono::time_point&gt;

```cpp
template< class Clock, class Duration1, class Duration2 >
struct common_type<std::chrono::time_point<Clock, Duration1>,
std::chrono::time_point<Clock, Duration2>>;  // (desde C++11)
```

  
Expõe o tipo nomeado `type`, que é o tipo comum de dois [std::chrono::time_point](<#/doc/chrono/time_point>)s. 

### Tipos-membro

Tipo-membro  |  Definição   
---|---
`type` |  [std::chrono::time_point](<#/doc/chrono/time_point>)<Clock, typename [std::common_type](<#/doc/types/common_type>)<Duration1, Duration2>::type>  
  
### Notas

O tipo comum de dois tipos [std::chrono::time_point](<#/doc/chrono/time_point>) é um [std::chrono::time_point](<#/doc/chrono/time_point>) com o mesmo clock que os dois tipos e o [std::common_type](<#/doc/types/common_type>) de suas durações. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ std::common_type<std::chrono::duration>](<#/doc/chrono/duration/common_type>)(C++11) | especializa o trait [std::common_type](<#/doc/types/common_type>)   
(especialização de template de classe)  
[ common_type](<#/doc/types/common_type>)(C++11) | determina o tipo comum de um grupo de tipos   
(template de classe)