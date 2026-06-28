# std::pmr::synchronized_pool_resource::options

[std::pmr::pool_options](<#/doc/memory/pool_options>) options() const; |  |  (desde C++17)  

  
Retorna as opções que controlam o comportamento de pooling deste recurso.

Os valores na struct retornada podem diferir daqueles fornecidos ao construtor das seguintes maneiras:

  * Valores zero serão substituídos por padrões especificados pela implementação;
  * Tamanhos podem ser arredondados para uma granularidade não especificada.

### Veja também

[ (constructor)](<#/doc/memory/synchronized_pool_resource/synchronized_pool_resource>) | constrói um `synchronized_pool_resource`   
(função membro pública)  