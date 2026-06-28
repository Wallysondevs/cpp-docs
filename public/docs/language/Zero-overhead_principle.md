# Princípio de Custo Zero

O _princípio de custo zero_ é um princípio de design do C++ que afirma:

1.  Você não paga pelo que não usa.
2.  O que você usa é tão eficiente quanto o que você poderia razoavelmente escrever manualmente.

Em geral, isso significa que nenhuma funcionalidade deve ser adicionada ao C++ que imponha qualquer custo (overhead), seja em tempo ou espaço, maior do que um programador introduziria sem usar a funcionalidade.

As únicas duas funcionalidades na linguagem que não seguem o princípio de custo zero são a [identificação de tipo em tempo de execução](<#/doc/language/typeid>) e as [exceções](<#/doc/language/exceptions>), e é por isso que a maioria dos compiladores inclui uma opção para desativá-las.

### Links externos

1.  | [Foundations of C++](<https://www.stroustrup.com/ETAPS-corrected-draft.pdf>) - Bjarne Stroustrup
---|---
2.  | [C++ exceptions and alternatives](<https://wg21.link/p1947>) - Bjarne Stroustrup
3.  | [De-fragmenting C++](<https://youtu.be/ARYP83yNAWk>) - Tornando [Exceções](<#/doc/language/exceptions>) e [RTTI](<#/doc/language/typeid>) Mais Acessíveis e Usáveis - Herb Sutter
4.  | [Bjarne Stroustrup: C++ on Artificial Intelligence (AI) Podcast](<https://youtu.be/uTxRF5ag27A?t=2478>)