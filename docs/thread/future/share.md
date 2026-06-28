# std::future&lt;T&gt;::share

[std::shared_future](<#/doc/thread/shared_future>)&lt;T&gt; share() noexcept;

  
Transfere o estado compartilhado de *this, se houver, para um objeto [std::shared_future](<#/doc/thread/shared_future>). Múltiplos objetos [std::shared_future](<#/doc/thread/shared_future>) podem referenciar o mesmo estado compartilhado, o que não é possível com [std::future](<#/doc/thread/future>). 

Após chamar `share` em um [std::future](<#/doc/thread/future>), [valid()](<#/doc/thread/future/valid>) == false. 

### Parâmetros

(nenhum) 

### Valor de retorno

Um objeto [std::shared_future](<#/doc/thread/shared_future>) contendo o estado compartilhado previamente mantido por *this, se houver, construído como se por [std::shared_future](<#/doc/thread/shared_future>)&lt;T&gt;(std::move(*this)). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2556](<https://cplusplus.github.io/LWG/issue2556>) | C++11  | `share()` exige que `valid()` seja `true` | requisito removido e tornado `noexcept`  
  
### Ver também

[ shared_future](<#/doc/thread/shared_future>)(C++11) |  aguarda por um valor (possivelmente referenciado por outros futures) que é definido assincronamente   
(modelo de classe)  