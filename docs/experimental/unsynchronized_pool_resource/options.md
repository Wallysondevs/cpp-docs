# std::experimental::pmr::unsynchronized_pool_resource::options

pool_options options() const; |  |  (library fundamentals TS)  

Retorna as opções que controlam o comportamento de pool deste recurso.

Os valores na struct retornada podem diferir daqueles fornecidos ao construtor das seguintes maneiras:

  * Valores zero serão substituídos por padrões especificados pela implementação;
  * Tamanhos podem ser arredondados para uma granularidade não especificada.

### Veja também

[ (constructor)](<#/doc/experimental/unsynchronized_pool_resource/unsynchronized_pool_resource>) | constrói um `unsynchronized_pool_resource`   
(função membro pública)  