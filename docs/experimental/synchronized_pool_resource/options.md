# std::experimental::pmr::synchronized_pool_resource::options

pool_options options() const; | | (TS de fundamentos da biblioteca)

Retorna as opções que controlam o comportamento de pool deste recurso.

Os valores na struct retornada podem diferir daqueles fornecidos ao construtor das seguintes maneiras:

  * Valores zero serão substituídos por padrões especificados pela implementação;
  * Tamanhos podem ser arredondados para uma granularidade não especificada.

### Veja também

[ (constructor)](<#/doc/experimental/synchronized_pool_resource/synchronized_pool_resource>) | constrói um `synchronized_pool_resource`
(função membro pública)