# %%
library(network)
library(sna)
library(ggplot2)
library(GGally)

# %%
N = 40
net = rgraph(N, mode = "graph", tprob = 0.15)
net = network(net, directed = FALSE)
p = ggnet2(
    net,
    node.color = "maroon",
    size=sample(0:2, N, replace = TRUE),
    max_size = 4,
    edge.size = .3,
    edge.color = "gray",
    edge.lty = "solid",
    mode = "kamadakawai"
) + theme(
    legend.position="none",
    panel.background = element_rect(fill='transparent'),
    plot.background = element_rect(fill='transparent', color=NA),
)
ggsave("./cover.png", p, bg="transparent")
p
